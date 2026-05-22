import { KanbanBoard } from './kanban';
import type { Task, TaskPriority, TaskStatus } from './types';

export class KanbanDOM {
  private board: KanbanBoard;

  // Elementos do DOM
  private btnAddTask = document.getElementById('btn-add-task') as HTMLButtonElement;
  private modalOverlay = document.getElementById('task-modal-overlay') as HTMLDivElement;
  private btnCloseModal = document.getElementById('btn-close-modal') as HTMLButtonElement;
  private btnCancelTask = document.getElementById('btn-cancel-task') as HTMLButtonElement;
  private taskForm = document.getElementById('task-form') as HTMLFormElement;
  
  // Inputs do Formulário
  private taskIdInput = document.getElementById('task-id-input') as HTMLInputElement;
  private taskTitleInput = document.getElementById('task-title') as HTMLInputElement;
  private taskDescInput = document.getElementById('task-desc') as HTMLTextAreaElement;
  private taskPriorityInput = document.getElementById('task-priority') as HTMLSelectElement;
  private modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
  private btnSaveTask = document.getElementById('btn-save-task') as HTMLButtonElement;

  // Colunas e Listas
  private columns = document.querySelectorAll('.kanban-column') as NodeListOf<HTMLElement>;
  private listTodo = document.getElementById('list-todo') as HTMLDivElement;
  private listDoing = document.getElementById('list-doing') as HTMLDivElement;
  private listDone = document.getElementById('list-done') as HTMLDivElement;

  // Contadores
  private countTodo = document.getElementById('count-todo') as HTMLSpanElement;
  private countDoing = document.getElementById('count-doing') as HTMLSpanElement;
  private countDone = document.getElementById('count-done') as HTMLSpanElement;

  // Variável para rastrear o ID da tarefa que está sendo arrastada no momento
  private draggedTaskId: string | null = null;

  constructor(board: KanbanBoard) {
    this.board = board;
    this.initializeEvents();
    this.render();
  }

  /**
   * Registra os eventos globais da interface (botões, modal, drag & drop)
   */
  private initializeEvents(): void {
    // Abertura do modal para Nova Tarefa
    this.btnAddTask.addEventListener('click', () => this.openModal());

    // Fechamento do modal
    this.btnCloseModal.addEventListener('click', () => this.closeModal());
    this.btnCancelTask.addEventListener('click', () => this.closeModal());
    
    // Fechar ao clicar fora do modal
    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) this.closeModal();
    });

    // Envio do formulário (Criar ou Editar)
    this.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // Configuração do Drag and Drop nas colunas
    this.setupDragAndDrop();
  }

  /**
   * Abre o modal de tarefas
   * Se taskId for fornecido, carrega os dados para edição
   */
  private openModal(taskId?: string): void {
    if (taskId) {
      const task = this.board.getTasks().find((t) => t.id === taskId);
      if (task) {
        this.modalTitle.textContent = 'Editar Tarefa';
        this.btnSaveTask.textContent = 'Salvar Alterações';
        this.taskIdInput.value = task.id;
        this.taskTitleInput.value = task.title;
        this.taskDescInput.value = task.description;
        this.taskPriorityInput.value = task.priority;
      }
    } else {
      this.modalTitle.textContent = 'Nova Tarefa';
      this.btnSaveTask.textContent = 'Criar Tarefa';
      this.taskForm.reset();
      this.taskIdInput.value = '';
    }
    this.modalOverlay.classList.add('active');
    this.taskTitleInput.focus();
  }

  /**
   * Fecha o modal
   */
  private closeModal(): void {
    this.modalOverlay.classList.remove('active');
    setTimeout(() => {
      this.taskForm.reset();
      this.taskIdInput.value = '';
    }, 200);
  }

  /**
   * Processa o envio do formulário de tarefa (Criação ou Edição)
   */
  private handleFormSubmit(e: Event): void {
    e.preventDefault();

    const id = this.taskIdInput.value;
    const title = this.taskTitleInput.value;
    const description = this.taskDescInput.value;
    const priority = this.taskPriorityInput.value as TaskPriority;

    if (!title.trim()) return;

    if (id) {
      // Editar tarefa existente
      this.board.updateTask(id, { title, description, priority });
    } else {
      // Criar nova tarefa
      this.board.addTask(title, description, priority);
    }

    this.closeModal();
    this.render();
  }

  /**
   * Configura os listeners de arrastar e soltar nas colunas
   */
  private setupDragAndDrop(): void {
    this.columns.forEach((column) => {
      const status = column.getAttribute('data-status') as TaskStatus;

      // Evento quando um elemento é arrastado por cima da coluna
      column.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault(); // Necessário para permitir o drop
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move';
        }
        column.classList.add('drag-over');
      });

      // Evento quando o elemento arrastado sai dos limites da coluna
      column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
      });

      // Evento de drop do item na coluna
      column.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault();
        column.classList.remove('drag-over');

        const taskId = e.dataTransfer?.getData('text/plain') || this.draggedTaskId;
        
        if (taskId) {
          const success = this.board.updateTaskStatus(taskId, status);
          if (success) {
            this.render();
          }
        }
        this.draggedTaskId = null;
      });
    });
  }

  /**
   * Formata a data de criação da tarefa de forma amigável
   */
  private formatDate(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return 'Agora mesmo';
    } else if (minutes < 60) {
      return `Há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (hours < 24) {
      return `Há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (days === 1) {
      return 'Ontem';
    } else {
      return new Date(timestamp).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
      });
    }
  }

  /**
   * Retorna um texto amigável para a prioridade da tarefa
   */
  private getPriorityLabel(priority: TaskPriority): string {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
    }
  }

  /**
   * Renderiza um cartão de tarefa
   */
  private createTaskCardElement(task: Task): HTMLElement {
    const card = document.createElement('article');
    card.className = 'task-card';
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-id', task.id);

    // Eventos de drag no próprio card
    card.addEventListener('dragstart', (e: DragEvent) => {
      this.draggedTaskId = task.id;
      card.classList.add('dragging');
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id);
      }
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      this.draggedTaskId = null;
      // Remover a classe drag-over de todas as colunas caso tenha restado alguma por erro do navegador
      this.columns.forEach(col => col.classList.remove('drag-over'));
    });

    // Conteúdo interno do Card
    card.innerHTML = `
      <div class="card-header">
        <span class="priority-tag ${task.priority}">${this.getPriorityLabel(task.priority)}</span>
        <div class="card-actions">
          <button class="btn-icon edit-btn" title="Editar Tarefa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button class="btn-icon delete delete-btn" title="Excluir Tarefa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      <h3 class="card-title">${this.escapeHTML(task.title)}</h3>
      ${task.description ? `<p class="card-desc">${this.escapeHTML(task.description)}</p>` : ''}
      <div class="card-footer">
        <div class="card-date">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>${this.formatDate(task.createdAt)}</span>
        </div>
      </div>
    `;

    // Vincular clique de edição
    const editBtn = card.querySelector('.edit-btn') as HTMLButtonElement;
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openModal(task.id);
    });

    // Vincular clique de exclusão
    const deleteBtn = card.querySelector('.delete-btn') as HTMLButtonElement;
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Deseja realmente excluir a tarefa "${task.title}"?`)) {
        this.board.deleteTask(task.id);
        this.render();
      }
    });

    return card;
  }

  /**
   * Previne ataques XSS limpando inputs de texto
   */
  private escapeHTML(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Cria o elemento HTML de empty state para colunas vazias
   */
  private createEmptyStateElement(status: TaskStatus): HTMLElement {
    const div = document.createElement('div');
    div.className = 'column-empty-state';
    
    let message = '';
    switch (status) {
      case 'todo': message = 'Nenhuma tarefa pendente'; break;
      case 'doing': message = 'Nenhuma tarefa em andamento'; break;
      case 'done': message = 'Nenhuma tarefa concluída'; break;
    }

    div.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12h8"></path>
      </svg>
      <span>${message}</span>
    `;

    return div;
  }

  /**
   * Atualiza todo o quadro Kanban na tela
   */
  public render(): void {
    const todoTasks = this.board.getTasksByStatus('todo');
    const doingTasks = this.board.getTasksByStatus('doing');
    const doneTasks = this.board.getTasksByStatus('done');

    // 1. Atualizar Contadores
    this.countTodo.textContent = todoTasks.length.toString();
    this.countDoing.textContent = doingTasks.length.toString();
    this.countDone.textContent = doneTasks.length.toString();

    // 2. Renderizar Coluna "Não Iniciado"
    this.renderTasksList(this.listTodo, todoTasks, 'todo');

    // 3. Renderizar Coluna "Iniciado"
    this.renderTasksList(this.listDoing, doingTasks, 'doing');

    // 4. Renderizar Coluna "Concluído"
    this.renderTasksList(this.listDone, doneTasks, 'done');
  }

  /**
   * Renderiza os itens de uma lista específica de tarefas
   */
  private renderTasksList(container: HTMLDivElement, tasks: Task[], status: TaskStatus): void {
    container.innerHTML = '';
    
    if (tasks.length === 0) {
      container.appendChild(this.createEmptyStateElement(status));
    } else {
      tasks.forEach((task) => {
        container.appendChild(this.createTaskCardElement(task));
      });
    }
  }
}
