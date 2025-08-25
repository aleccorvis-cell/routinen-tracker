document.addEventListener('DOMContentLoaded', () => {
    const routineForm = document.getElementById('routineForm');
    const routinesContainer = document.getElementById('routines');

    // Funktion zum Speichern von Routinen im Browser-Speicher (LocalStorage)
    const saveRoutines = (routines) => {
        localStorage.setItem('routines', JSON.stringify(routines));
    };

    // Funktion zum Laden von Routinen aus dem Browser-Speicher
    const loadRoutines = () => {
        const storedRoutines = localStorage.getItem('routines');
        return storedRoutines ? JSON.parse(storedRoutines) : [];
    };

    // Funktion zur Berechnung des Enddatums
    const calculateEndDate = (startDate, duration) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + duration);
        return date.toISOString().split('T')[0];
    };

    // Funktion zum Rendern (Anzeigen) der Routinen auf der Seite
    const renderRoutines = () => {
        const routines = loadRoutines();
        routinesContainer.innerHTML = ''; // Vorherige Routinen löschen
        if (routines.length === 0) {
            routinesContainer.innerHTML = '<p>Noch keine Routinen hinzugefügt. Füge eine neue Routine hinzu, um zu starten!</p>';
            return;
        }

        routines.forEach((routine, index) => {
            const routineItem = document.createElement('div');
            routineItem.className = 'routine-item';

            const endDate = calculateEndDate(routine.startDate, routine.duration);

            routineItem.innerHTML = `
                <h3>${routine.name}</h3>
                <div class="routine-details">
                    <span>Start: ${routine.startDate}</span>
                    <span>Ende: ${endDate}</span>
                    <span>Dauer: ${routine.duration} Tage</span>
                </div>
            `;
            routinesContainer.appendChild(routineItem);
        });
    };

    // Event-Listener für das Formular
    routineForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Verhindert das Neuladen der Seite

        const routineName = document.getElementById('routineName').value;
        const duration = parseInt(document.getElementById('duration').value, 10);
        const startDate = document.getElementById('startDate').value;

        if (routineName && duration && startDate) {
            const newRoutine = {
                name: routineName,
                duration: duration,
                startDate: startDate
            };

            const routines = loadRoutines();
            routines.push(newRoutine);
            saveRoutines(routines);
            renderRoutines();

            // Formular zurücksetzen
            routineForm.reset();
        }
    });

    // App beim Laden der Seite initialisieren
    renderRoutines();

    // Das Startdatum standardmäßig auf das heutige Datum setzen
    const today = new Date().toISOString().split('T')[0];
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        startDateInput.value = today;
    }
});
