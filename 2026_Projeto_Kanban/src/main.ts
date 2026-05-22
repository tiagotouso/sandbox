import { KanbanBoard } from './kanban';
import { KanbanDOM } from './dom';

// Inicializa a aplicação assim que o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const board = new KanbanBoard();
  new KanbanDOM(board);
  
  console.log('🚀 Antigravity Kanban inicializado com sucesso!');
});
