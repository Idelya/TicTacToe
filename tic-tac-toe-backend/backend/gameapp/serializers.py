from backend.gameapp.models import Game
from backend.userapp import serializers


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ["board", "player_x", "player_o", "winner", "status"]