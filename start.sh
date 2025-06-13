#!/bin/sh
# Script to start the bot in a detached screen, assumes already created node package etc.

name="dguy-bot"
tmux new-session -d -s "$name" "node ."
echo "Bot started in tmux session: '$name'"
echo "Attach to session with 'tmux attach -t $name'"
echo "Detach session with 'Ctrl-b d'"
