import random  # Importa o módulo random para usar funções de aleatoriedade
import svgwrite  # Importa o módulo svgwrite para gerar arquivos SVG

# Parâmetros
width = 25  # Largura do labirinto em número de células
height = 25  # Altura do labirinto em número de células
cell_size = 20  # Tamanho (em pixels) de cada célula no SVG

# Direções possíveis para movimentação e suas coordenadas relativas (dx, dy), com nome da direção oposta
DIRECTIONS = {
    'N': (0, -1, 'S'),  # Norte move uma célula para cima, oposto é Sul
    'S': (0, 1, 'N'),   # Sul move uma célula para baixo, oposto é Norte
    'E': (1, 0, 'W'),   # Leste move uma célula para a direita, oposto é Oeste
    'W': (-1, 0, 'E')   # Oeste move uma célula para a esquerda, oposto é Leste
}

# Função para gerar o labirinto usando busca em profundidade (DFS)
def generate_maze(width, height):
    # Cria a estrutura do labirinto: cada célula começa com todas as paredes (N, S, E, W)
    maze = [[{'N': True, 'S': True, 'E': True, 'W': True} for _ in range(width)] for _ in range(height)]
    
    # Matriz que registra se a célula já foi visitada
    visited = [[False for _ in range(width)] for _ in range(height)]

    # Função recursiva de busca em profundidade
    def dfs(x, y):
        visited[y][x] = True  # Marca a célula atual como visitada
        directions = list(DIRECTIONS.items())  # Lista de direções possíveis
        random.shuffle(directions)  # Embaralha as direções para gerar labirintos diferentes

        for direction, (dx, dy, opposite) in directions:
            nx, ny = x + dx, y + dy  # Calcula coordenadas da próxima célula
            # Verifica se está dentro dos limites e se ainda não foi visitada
            if 0 <= nx < width and 0 <= ny < height and not visited[ny][nx]:
                maze[y][x][direction] = False  # Remove parede da direção atual
                maze[ny][nx][opposite] = False  # Remove parede oposta da célula vizinha
                dfs(nx, ny)  # Chama recursivamente para a próxima célula

    dfs(0, 0)  # Começa o DFS a partir do canto superior esquerdo (0,0)

    # Remove a parede superior da célula de entrada
    maze[0][0]['N'] = False

    # Remove a parede inferior da célula de saída (canto inferior direito)
    maze[height - 1][width - 1]['S'] = False

    return maze  # Retorna o labirinto gerado

# Função para converter o labirinto em um arquivo SVG
def maze_to_svg(maze, width, height, cell_size):
    # Cria um novo desenho SVG com o tamanho total do labirinto
    dwg = svgwrite.Drawing(size=(width * cell_size, height * cell_size), profile='tiny')
    
    # Percorre cada célula do labirinto
    for y in range(height):
        for x in range(width):
            cell = maze[y][x]  # Célula atual
            x1 = x * cell_size  # Posição x no SVG
            y1 = y * cell_size  # Posição y no SVG

            # Se a parede estiver presente, desenha a linha correspondente
            if cell['N']:
                dwg.add(dwg.line(start=(x1, y1), end=(x1 + cell_size, y1), stroke='black'))  # Parede superior
            if cell['S']:
                dwg.add(dwg.line(start=(x1, y1 + cell_size), end=(x1 + cell_size, y1 + cell_size), stroke='black'))  # Parede inferior
            if cell['W']:
                dwg.add(dwg.line(start=(x1, y1), end=(x1, y1 + cell_size), stroke='black'))  # Parede esquerda
            if cell['E']:
                dwg.add(dwg.line(start=(x1 + cell_size, y1), end=(x1 + cell_size, y1 + cell_size), stroke='black'))  # Parede direita

    return dwg  # Retorna o desenho SVG do labirinto

# Gera o labirinto
maze = generate_maze(width, height)

# Converte o labirinto para SVG
svg = maze_to_svg(maze, width, height, cell_size)

# Salva o desenho SVG em um arquivo chamado "labirinto.svg"
svg.saveas("labirinto.svg")

# Imprime mensagem de sucesso
print("Labirinto com entrada e saída gerado e salvo como 'labirinto.svg'")

