/**
 * TaskFlow — To-Do App
 * Persistência via localStorage simulando db.json com "users" e "todos"
 */

// ─── DB Helpers ────────────────────────────────────────────────────────────────

const DB = {
    init() {
        if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
        if (!localStorage.getItem('todos'))  localStorage.setItem('todos',  JSON.stringify([]));
    },
    getUsers()       { return JSON.parse(localStorage.getItem('users'))  || []; },
    getTodos()       { return JSON.parse(localStorage.getItem('todos'))  || []; },
    saveUsers(data)  { localStorage.setItem('users', JSON.stringify(data)); },
    saveTodos(data)  { localStorage.setItem('todos', JSON.stringify(data)); },
    getCurrentUser() {
        const raw = localStorage.getItem('currentUser');
        return raw ? JSON.parse(raw) : null;
    },
    setCurrentUser(user) { localStorage.setItem('currentUser', JSON.stringify(user)); },
    clearCurrentUser()   { localStorage.removeItem('currentUser'); },
};

// ─── UI Helpers ────────────────────────────────────────────────────────────────

const $ = (id) => document.getElementById(id);

function showError(id, msg) {
    const el = $(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
}

function clearErrors(...prefixes) {
    prefixes.forEach(prefix => {
        document.querySelectorAll(`[id^="${prefix}-"][id$="-error"]`)
            .forEach(el => el.classList.add('hidden'));
    });
}

function showView(view) {
    $('auth-container').classList.add('hidden');
    $('app-container').classList.add('hidden');
    $('login-view').classList.add('hidden');
    $('signup-view').classList.add('hidden');

    if (view === 'login') {
        $('auth-container').classList.remove('hidden');
        $('login-view').classList.remove('hidden');
    } else if (view === 'signup') {
        $('auth-container').classList.remove('hidden');
        $('signup-view').classList.remove('hidden');
    } else if (view === 'app') {
        $('app-container').classList.remove('hidden');
        const user = DB.getCurrentUser();
        if (user) {
            $('welcome-message').textContent = `Olá, ${user.name} 👋`;
        }
        renderTasks();
    }
}

// ─── Auth: Login ───────────────────────────────────────────────────────────────

$('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('login');

    const email    = $('login-email').value.trim();
    const password = $('login-password').value;
    let hasError   = false;

    if (!email) {
        showError('login-email-error', 'Informe seu e-mail.');
        hasError = true;
    }
    if (!password) {
        showError('login-password-error', 'Informe sua senha.');
        hasError = true;
    }
    if (hasError) return;

    const users = DB.getUsers();
    const user  = users.find(u => u.email === email);

    if (!user) {
        showError('login-general-error', 'E-mail não encontrado. Verifique ou crie uma conta.');
        return;
    }
    if (user.password !== password) {
        showError('login-general-error', 'Senha incorreta. Tente novamente.');
        return;
    }

    const { password: _, ...safeUser } = user;
    DB.setCurrentUser(safeUser);
    $('login-form').reset();
    showView('app');
});

// ─── Auth: Signup ──────────────────────────────────────────────────────────────

$('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('signup');

    const name     = $('signup-name').value.trim();
    const email    = $('signup-email').value.trim();
    const password = $('signup-password').value;
    let hasError   = false;

    if (!name) {
        showError('signup-name-error', 'Informe seu nome.');
        hasError = true;
    }
    if (!email) {
        showError('signup-email-error', 'Informe seu e-mail.');
        hasError = true;
    }
    if (!password) {
        showError('signup-password-error', 'Informe uma senha.');
        hasError = true;
    } else if (password.length < 6) {
        showError('signup-password-error', 'A senha precisa ter no mínimo 6 caracteres.');
        hasError = true;
    }
    if (hasError) return;

    const users = DB.getUsers();

    if (users.some(u => u.email === email)) {
        showError('signup-general-error', 'Este e-mail já está em uso. Faça login.');
        return;
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    DB.saveUsers(users);

    const { password: _, ...safeUser } = newUser;
    DB.setCurrentUser(safeUser);
    $('signup-form').reset();
    showView('app');
});

// ─── Auth: Navegação entre telas ───────────────────────────────────────────────

$('go-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    clearErrors('login');
    $('login-form').reset();
    showView('signup');
});

$('go-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    clearErrors('signup');
    $('signup-form').reset();
    showView('login');
});

$('logout-btn').addEventListener('click', () => {
    DB.clearCurrentUser();
    showView('login');
});

// ─── Tasks: Adicionar ──────────────────────────────────────────────────────────

$('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('task');

    const title = $('task-title').value.trim();
    const type  = $('task-type').value;
    const desc  = $('task-desc').value.trim();

    if (!title) {
        showError('task-title-error', 'O título da tarefa é obrigatório.');
        return;
    }

    const user  = DB.getCurrentUser();
    const todos = DB.getTodos();

    const newTodo = {
        id:          Date.now().toString(),
        userId:      user.email,
        title,
        type,
        description: desc,
        done:        false,
        createdAt:   new Date().toISOString(),
    };

    todos.push(newTodo);
    DB.saveTodos(todos);
    $('task-form').reset();
    renderTasks();
});

// ─── Tasks: Concluir / Deletar ─────────────────────────────────────────────────

function toggleDone(id) {
    const todos   = DB.getTodos();
    const idx     = todos.findIndex(t => t.id === id);
    if (idx === -1) return;
    todos[idx].done = !todos[idx].done;
    DB.saveTodos(todos);
    renderTasks();
}

function deleteTask(id) {
    const todos = DB.getTodos().filter(t => t.id !== id);
    DB.saveTodos(todos);
    renderTasks();
}

// ─── Tasks: Renderizar ─────────────────────────────────────────────────────────

const TYPE_META = {
    trabalho: { label: 'Trabalho', badgeClass: 'badge-trabalho', emoji: '💼' },
    pessoal:  { label: 'Pessoal',  badgeClass: 'badge-pessoal',  emoji: '🧡' },
    estudos:  { label: 'Estudos',  badgeClass: 'badge-estudos',  emoji: '📚' },
};

function buildTaskCard(todo) {
    const meta = TYPE_META[todo.type] || TYPE_META.pessoal;
    const doneClass = todo.done ? 'done' : '';
    const btnLabel  = todo.done ? 'Reabrir' : 'Concluir';
    const btnIcon   = todo.done
        ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>`;

    const descHtml = todo.description
        ? `<p class="text-slate-400 text-sm mt-2 leading-relaxed">${escapeHtml(todo.description)}</p>`
        : '';

    const card = document.createElement('div');
    card.className = `task-card rounded-2xl p-5 task-enter ${doneClass}`;
    card.dataset.id = todo.id;

    card.innerHTML = `
        <div class="flex items-start justify-between gap-3">
            <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                    <span class="task-title font-semibold text-white text-sm truncate">${escapeHtml(todo.title)}</span>
                    <span class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${meta.badgeClass}">
                        ${meta.emoji} ${meta.label}
                    </span>
                </div>
                ${descHtml}
            </div>
            <div class="flex items-center gap-2 shrink-0">
                <button
                    class="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-all
                    ${todo.done
                        ? 'text-slate-400 bg-slate-800/60 hover:bg-slate-700/70 border border-slate-700/50'
                        : 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20'}"
                    onclick="toggleDone('${todo.id}')"
                    title="${btnLabel}">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${btnIcon}</svg>
                    ${btnLabel}
                </button>
                <button
                    class="text-slate-600 hover:text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition-all"
                    onclick="deleteTask('${todo.id}')"
                    title="Excluir">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    return card;
}

function renderTasks() {
    const user      = DB.getCurrentUser();
    if (!user) return;

    const allTodos  = DB.getTodos();
    const myTodos   = allTodos.filter(t => t.userId === user.email);

    // Pendentes primeiro, concluídas no final
    const pending   = myTodos.filter(t => !t.done);
    const done      = myTodos.filter(t =>  t.done);
    const sorted    = [...pending, ...done];

    // Atualizar stats
    $('stat-total').textContent   = myTodos.length;
    $('stat-done').textContent    = done.length;
    $('stat-pending').textContent = pending.length;

    const list = $('task-list');
    list.innerHTML = '';

    if (sorted.length === 0) {
        $('empty-state').classList.remove('hidden');
    } else {
        $('empty-state').classList.add('hidden');
        sorted.forEach(todo => list.appendChild(buildTaskCard(todo)));
    }
}

// ─── Util: Sanitização ─────────────────────────────────────────────────────────

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

// ─── Bootstrap ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    const user = DB.getCurrentUser();
    showView(user ? 'app' : 'login');
});
