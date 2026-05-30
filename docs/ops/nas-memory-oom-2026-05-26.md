# NAS RAM/OOM 장애 노트 (2026-05-26)

작성일: 2026-05-30 KST

대상: DIY NAS Hyper-V VM `nas-linux-pilot`
관련 서비스: FileBrowser, Tailscale, ZFS `livepool`

## 요약

2026-05-26에 NAS VM이 메모리 부족 상태에서 커널 패닉으로 멈추며, Windows/Mac에서 NAS 드라이브 접근이 불안정해졌다. Hyper-V 콘솔에는 다음 메시지가 표시되었다.

```text
KERNEL PANIC!
Please reboot your computer.
System is deadlocked on memory
```

재부팅 뒤 로그를 확인한 결과, 이전 부팅에서 OOM killer가 동작한 흔적이 있었다.

```text
kthreadd invoked oom-killer
```

원인은 VM 메모리 부족, ZFS ARC 메모리 사용, Ubuntu 26.04 / kernel 7.0.0-15-generic / ZFS 조합의 불안정 가능성이 겹친 것으로 본다.

## 당시 증상

- Mac/Windows에서 NAS 드라이브가 열리지 않음
- Hyper-V 콘솔의 Ubuntu VM이 커널 패닉 화면에서 멈춤
- 재부팅 후 FileBrowser와 Tailscale은 다시 정상화됨
- ZFS pool 자체의 데이터 오류는 확인되지 않음

## 확인된 상태

ZFS 상태:

```text
pool: livepool
state: ONLINE
errors: No known data errors
READ WRITE CKSUM: 0 0 0
```

systemd 실패 서비스:

```text
0 loaded units listed
```

Tailscale:

```text
100.124.222.45  nas-linux-pilot
```

SSH:

```text
ssh.service: active (running)
```

## 적용한 보완

### 1. VM 메모리 증설

Hyper-V VM 메모리를 12GB 고정으로 조정했다.

```text
RAM: 12288 MB
Dynamic memory: disabled
```

재부팅 후 확인:

```text
Mem: 11Gi
available: 10Gi
Swap used: 0B
```

### 2. ZFS ARC 제한

ZFS가 VM 메모리를 과도하게 잡아먹지 않도록 ARC 상한을 2GB로 제한했다.

설정 파일:

```text
/etc/modprobe.d/zfs.conf
```

설정값:

```text
options zfs zfs_arc_max=2147483648
options zfs zfs_arc_min=536870912
```

적용:

```bash
sudo update-initramfs -u
```

확인:

```text
c_min 536870912
c_max 2147483648
memory_throttle_count 0
```

### 3. journal 영구 저장

다음 장애 때 이전 부팅 로그가 남도록 systemd journal 영구 저장을 켰다.

설정 파일:

```text
/etc/systemd/journald.conf.d/10-persistent.conf
```

설정:

```ini
[Journal]
Storage=persistent
SystemMaxUse=1G
RuntimeMaxUse=256M
MaxRetentionSec=30day
Compress=yes
```

확인:

```text
Archived and active journals take up 96M in the file system.
```

### 4. Hyper-V 자동 검사점 비활성화

스토리지/가상 디스크 상태와 충돌할 수 있는 자동 검사점은 사용하지 않도록 했다.

### 5. SSH 활성화

Hyper-V 콘솔 없이도 Windows PowerShell에서 NAS에 접속할 수 있도록 SSH를 활성화했다.

```bash
sudo systemctl enable --now ssh
```

## 운영 점검 명령

NAS 접속 후 기본 상태 확인:

```bash
free -h
sudo zpool status -v
systemctl --failed --no-pager
cat /proc/spl/kstat/zfs/arcstats | grep -E '^(size|c_min|c_max|memory_throttle_count) '
journalctl --disk-usage
```

이전 부팅 장애 로그 확인:

```bash
journalctl --list-boots
sudo journalctl -k -b -1 --no-pager | grep -Ei 'panic|deadlock|oom|out of memory|hung|blocked|call trace|i/o error|zfs|spl|lockup|BUG'
```

## 주의할 점

- Hyper-V Default Switch의 `172.25.x.x` 주소는 바뀔 수 있으므로 장기 설정에는 쓰지 않는다.
- 장기 접속 기준은 Tailscale IP 또는 Cloudflare Tunnel을 우선한다.
- ZFS mirror는 장애 대응용 중복성이지 백업이 아니다.
- 정기적으로 `zpool scrub livepool`과 백업 상태를 확인한다.
- Ubuntu kernel / ZFS 조합에서 실험적 경고가 보였으므로 kernel/ZFS 업데이트 시 백업 확인 후 진행한다.

## 결론

장애의 직접 증상은 Ubuntu VM 커널 패닉이고, 핵심 원인은 메모리 부족/OOM으로 판단한다. 현재는 VM 메모리 증설, ZFS ARC 제한, journal 영구 저장, SSH 활성화, Hyper-V 자동 검사점 비활성화까지 적용되어 재발 가능성을 낮춘 상태다.
