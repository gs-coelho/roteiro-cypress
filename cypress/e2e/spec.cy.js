describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa existente', () => {
    cy.visit('');

    // Adiciona uma tarefa
    cy.get('[data-cy=todo-input]')
      .type('Tarefa original{enter}');

    // Dá duplo clique no label para editar
    cy.get('[data-cy=todos-list] > li label')
      .dblclick();

    // Limpa o texto existente e digita o novo texto
    cy.get('[data-cy=todos-list] > li .edit')
      .clear()
      .type('Tarefa editada{enter}');

    // Verifica se o texto foi atualizado
    cy.get('[data-cy=todos-list] > li')
      .should('have.text', 'Tarefa editada');
  });

  it('Limpa todas as tarefas completas', () => {
    cy.visit('');

    // Adiciona duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    // Marca a primeira tarefa como completa
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    // Clica no botão de limpar completas
    cy.get('footer .clear-completed')
      .click();

    // Verifica se apenas a tarefa incompleta permanece
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa 2');
  });

  it('Alterna todas as tarefas de uma vez', () => {
    cy.visit('');

    // Adiciona duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    // Marca todas as tarefas como completas
    cy.get('.toggle-all-label')
      .click();

    // Verifica se todas as tarefas foram marcadas como completas
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.class', 'completed');

    // Desmarca todas as tarefas
    cy.get('.toggle-all-label')
      .click();

    // Verifica se todas as tarefas foram desmarcadas
    cy.get('[data-cy=todos-list]')
      .children()
      .should('not.have.class', 'completed');
  });
});