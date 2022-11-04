from collections import Counter

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

WINNING_TAB = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

class Game(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    board = models.CharField(max_length=9, default=" " * 9)
    player_x = models.ForeignKey(User, related_name='player_o', on_delete=models.CASCADE, blank=True, null=True)
    player_o = models.ForeignKey(User, related_name='player_x', on_delete=models.CASCADE, blank=True, null=True)
    winner = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE, blank=True, null=True)
    status = models.CharField(max_length=9, default="WAITING")
    player_x_name = models.CharField(max_length=30, default="", blank=True)
    player_o_name = models.CharField(max_length=30, default="", blank=True)

    @property
    def next_player(self):
        count = Counter(self.board)
        if count.get('x', 0) > count.get('o', 0):
            return 'o'
        return 'x'



    @property
    def next_player(self):
        count = Counter(self.board)
        if count.get('x', 0) > count.get('o', 0):
            return 'o'
        return 'x'

    @property
    def check_winner(self, board):
        for wins in self.WINNING:
            w = (board[wins[0]], board[wins[1]], board[wins[2]])
            if w == ('x', 'x', 'x'):
                return self.player_x
            if w == ('o', 'o', 'o'):
                return self.player_o
        if ' ' in board:
            return None
        return 'TIE'