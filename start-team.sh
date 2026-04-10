#!/bin/bash

SESSION="IT기획팀"
WORKDIR="/mnt/c/Users/BN211/Desktop/claude"

# 기존 세션 있으면 종료
tmux kill-session -t "$SESSION" 2>/dev/null

# 새 세션 생성
tmux new-session -d -s "$SESSION"

# ── 레이아웃 ───────────────────────────────────────
# [ 팀장          | 서비스기획자 ]
# [ 기술검토자    | UX기획자     ]

# 오른쪽 세로 분할
tmux split-window -h -t "$SESSION:0"

# 왼쪽 가로 분할
tmux split-window -v -t "$SESSION:0.0"

# 오른쪽 가로 분할
tmux split-window -v -t "$SESSION:0.1"

# pane 타이틀 설정 (tmux select-pane -T)
tmux select-pane -t "$SESSION:0.0" -T "👑 팀장 (Claude)"
tmux select-pane -t "$SESSION:0.2" -T "📋 서비스기획자"
tmux select-pane -t "$SESSION:0.1" -T "⚙️  기술검토자"
tmux select-pane -t "$SESSION:0.3" -T "🎨 UX기획자"

# pane 테두리에 타이틀 표시
tmux set-option -t "$SESSION" pane-border-status top
tmux set-option -t "$SESSION" pane-border-format "#{?pane_active,#[fg=brightyellow bold],#[fg=cyan]} #{pane_title} #[default]"

# 각 pane에서 claude 실행
tmux send-keys -t "$SESSION:0.0" "cd $WORKDIR && claude" Enter
tmux send-keys -t "$SESSION:0.2" "cd $WORKDIR && claude" Enter
tmux send-keys -t "$SESSION:0.1" "cd $WORKDIR && claude" Enter
tmux send-keys -t "$SESSION:0.3" "cd $WORKDIR && claude" Enter

# 팀장 pane 포커스 후 attach
tmux select-pane -t "$SESSION:0.0"
tmux attach-session -t "$SESSION"
