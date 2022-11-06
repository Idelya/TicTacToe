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

    def get(self, request, *args, **kwargs):
        game = Game.objects.filter(Q(status="WAITING") & ~Q(player_x=request.user.id) & ~Q(player_o=request.user.id))
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, game_id, *args, **kwargs):
        player = request.user.id
        game = Game.objects.get(id=game_id)
        if (game.player_x is not None and game.player_x.id != player) and (game.player_o is not None and game.player_o.id != player):
            return Response("You don't have access", status=status.HTTP_401_UNAUTHORIZED)
        serializer = GameSerializer(game)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CurrentGameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        player = request.user.id
        game = self.get_object(player)
        game.first().print_game()
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_object(self, user_id):
        try:
            return Game.objects.filter(Q(player_o=user_id) | Q(player_x=user_id)).filter(
                Q(status="INPLAY") | Q(status="WAITING") | Q(status="INPLAY"))
        except Game.DoesNotExist:
            return None

    def put(self, request, *args, **kwargs):
        game = self.get_object(request.user.id).first()
        print(game.player_x, game.player_x.id, game.player_o, request.user.id)
        symbol = 'x' if game.player_x_name == request.user.username else 'o'
        new_board_list = list(game.board)
        field_num = request.data.get('fieldNum')
        new_board_list[field_num] = symbol
        print(new_board_list)
        new_board = ''.join(new_board_list)
        print(new_board)
        print(list(new_board))
        winner = game.check_winner(board=new_board_list)
        print(winner)
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

    # NEW GAME
    def post(self, request, *args, **kwargs):
        player_side = request.data.get('player'),
        print(player_side)
        if player_side == 'x':
            data = {'player_x': request.user.id,
                    'player_o': None,
                    'player_x_name': request.user.username,
                    'player_o_name': ""
                    }
        else:
            data = {
                'player_o': request.user.id,
                'player_x': None,
                'player_o_name': request.user.username,
                'player_x_name': ""
            }
        serializer = GameSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class JoinGameAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # JOIN GAME
    def put(self, request, game_id, *args, **kwargs):
        game = Game.objects.get(id=game_id)
        game.print_game()
        if not game:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if game.player_o is None:
            data = {
                'player_o': request.user.id, 'status': "INPLAY", 'player_o_name': request.user.username
            }
        else:
            data = {'player_x': request.user.id, 'status': "INPLAY", 'player_x_name': request.user.username}

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
        games_win = games_all.filter(winner=user_id)
        games_tie = games_all.filter(winner=None)
        data = {
            'all': len(games_all),
            'win': len(games_win),
            'tie': len(games_tie)
        }
        return Response(data, status=status.HTTP_200_OK)
