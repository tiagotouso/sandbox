import type { Task, TaskPriority, TaskStatus } from './types';

export class KanbanBoard {
  private tasks: Task[] = [];
  private readonly STORAGE_KEY = 'antigravity_kanban_tasks';

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Adiciona uma nova tarefa à lista
   */
  public addTask(title: string, description: string, priority: TaskPriority): Task {
    const newTask: Task = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'todo',
      createdAt: Date.now(),
    };

    this.tasks.push(newTask);
    this.saveToLocalStorage();
    return newTask;
  }

  /**
   * Atualiza o status de uma tarefa (ex: ao arrastar e soltar)
   */
  public updateTaskStatus(id: string, status: TaskStatus): boolean {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.status = status;
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  /**
   * Edita os dados de uma tarefa
   */
  public updateTask(
    id: string,
    updates: Partial<Omit<Task, 'id' | 'createdAt' | 'status'>>
  ): boolean {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = {
        ...this.tasks[taskIndex],
        ...updates,
        title: updates.title ? updates.title.trim() : this.tasks[taskIndex].title,
        description: updates.description !== undefined ? updates.description.trim() : this.tasks[taskIndex].description,
      };
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  /**
   * Deleta uma tarefa pelo ID
   */
  public deleteTask(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    if (this.tasks.length !== initialLength) {
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  /**
   * Retorna todas as tarefas
   */
  public getTasks(): Task[] {
    // Retorna uma cópia para evitar modificações diretas
    return [...this.tasks];
  }

  /**
   * Retorna as tarefas filtradas por status, ordenadas por data de criação
   */
  public getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks
      .filter((t) => t.status === status)
      .sort((a, b) => b.createdAt - a.createdAt); // Mais recentes primeiro
  }

  /**
   * Salva as tarefas no LocalStorage
   */
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas no LocalStorage:', error);
    }
  }

  /**
   * Carrega as tarefas do LocalStorage
   */
  private loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.tasks = JSON.parse(stored);
      } else {
        // Tarefas de exemplo iniciais para que o usuário não veja o quadro totalmente vazio
        this.tasks = [
          {
            id: 'example-1',
            title: 'Criar documentação do projeto',
            description: 'Escrever o README detalhado com as tecnologias utilizadas no Kanban.',
            priority: 'low',
            status: 'todo',
            createdAt: Date.now() - 3600000 * 4,
          },
          {
            id: 'example-2',
            title: 'Ajustar transições do Drag & Drop',
            description: 'Adicionar feedback visual moderno ao arrastar os itens entre as colunas.',
            priority: 'medium',
            status: 'doing',
            createdAt: Date.now() - 3600000 * 2,
          },
          {
            id: 'example-3',
            title: 'Estruturação do layout HTML/CSS',
            description: 'Criar o layout grid do Kanban e aplicar o visual dark com glassmorphism.',
            priority: 'high',
            status: 'done',
            createdAt: Date.now() - 3600000 * 8,
          },
        ];
        this.saveToLocalStorage();
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas do LocalStorage:', error);
      this.tasks = [];
    }
  }
}
