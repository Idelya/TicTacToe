from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from backend.gameapp.models import Game
from backend.gameapp.serializers import GameSerializer


class RoomsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, *args, **kwargs):
        game = Game.objects.filter(status="WAITING")
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CurrentGameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        player = request.user.id
        game = self.get_object(player)
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self, user_id):
        try:
            return Game.objects.filter(Q(player_o=user_id) | Q(player_x=user_id)).filter(Q(status="INPLAY"))[0]
        except Game.DoesNotExist:
            return None

    def put(self, request, *args, **kwargs):
        game = self.get_object(request.user.id)
        symbol = 'x' if game.player_x == request.user.id else 'y'
        new_board = game.board
        new_board[request.data.get('fieldNum')] = symbol
        winner = game.check_winner(new_board)
        if winner is None:
            data = {
                'board': new_board,
            }
        else:
            if winner == "TIE":
                data = {
                    'board': new_board,
                    'status': 'FINISHED',
                }
            else:
                data = {
                    'board': new_board,
                    'status': 'FINISHED',
                    'winner': winner
                }

        serializer = GameSerializer(instance=game, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FinishedGameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, game_id, *args, **kwargs):
        player = request.user.id
        game = self.get_object(player)
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NewGameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #NEW GAME
    def post(self, request, *args, **kwargs):
        player_side = request.data.get('player'),
        if player_side == 'x':
            data = {'player_x': request.user.id}
        else:
            data = {
                'player_o': request.user.id
            }
        serializer = GameSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JoinGameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #JOIN GAME
    def put(self, request, game_id, *args, **kwargs):
        game = Game.objects.get(id=game_id)
        if not game:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if game.player_o:
            data = {'player_x': request.user.id, status: "INPLAY"}
        else:
            data = {
                'player_o': request.user.id, status: "INPLAY"
            }
        serializer = GameSerializer(instance=game, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserStatsAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, resuest, *args, **kwargs):
        user_id = resuest.user.id
        games_all = Game.objects.filter(Q(player_o=user_id) | Q(player_x=user_id)).filter(status="FINISHED")
        games_win = games_all.filter(winner = user_id)
        games_tie = games_all.filter(winner = None)
        data = {
            'all': len(games_all),
            'win': len(games_win),
            'tie': len(games_tie)
        }
        return Response(data, status=status.HTTP_200_OK)