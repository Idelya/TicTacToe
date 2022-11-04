from rest_framework import serializers

from backend.gameapp.models import Game


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["id", "board", "player_x", "player_o", "winner", "status", 'player_x_name', 'player_o_name']