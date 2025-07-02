document.addEventListener('DOMContentLoaded', () => {
    const answers = {};
    let currentQuestion = 1;
    const totalQuestions = 5; // Updated to match quiz.html (q1 to q5)

    function updateButtons() {
        document.querySelectorAll('.question-section').forEach((section, index) => {
            const qNum = index + 1;
            const backBtn = section.querySelector('#back-btn');
            const nextBtn = section.querySelector('#next-btn');
            const submitBtn = section.querySelector('#submit-btn');
            if (backBtn) backBtn.style.display = qNum === 1 ? 'none' : 'inline-block';
            if (nextBtn) nextBtn.style.display = qNum === totalQuestions ? 'none' : 'inline-block';
            if (submitBtn) submitBtn.style.display = qNum === totalQuestions ? 'inline-block' : 'none';
        });
        console.log('Buttons updated, currentQuestion:', currentQuestion);
    }

    function showQuestion(qNum) {
        if (qNum < 1 || qNum > totalQuestions) {
            console.error(`Invalid question number: ${qNum}`);
            return;
        }
        const targetSection = document.querySelector(`#q${qNum}`);
        if (!targetSection) {
            console.error(`Question section #q${qNum} not found in DOM`);
            return;
        }
        document.querySelectorAll('.question-section').forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });
        targetSection.classList.add('active');
        targetSection.style.display = 'flex';
        const resultElement = document.querySelector('#result');
        if (resultElement) {
            resultElement.style.display = 'none';
        } else {
            console.warn('Result element (#result) not found in DOM');
        }
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.remove('active');
        }
        currentQuestion = qNum;
        console.log(`Showing question ${qNum}, currentQuestion set to: ${currentQuestion}`);
        console.log(`DOM state: #q${qNum} active: ${targetSection.classList.contains('active')}, #result exists: ${!!resultElement}`);
        updateButtons();
    }

    function saveAnswer() {
        if (currentQuestion === 1) {
            const selected = Array.from(document.querySelectorAll('.option-list li.selected'))
                .map(option => option.dataset.value);
            if (selected.length > 0) {
                answers['q1'] = selected;
            } else {
                delete answers['q1'];
            }
            console.log('Saved Q1 answers:', answers['q1']);
        } else if (currentQuestion === 2) {
            const selected = Array.from(document.querySelectorAll('.learning-language-box.selected'))
                .map(button => button.querySelector('.learning-language-title').textContent.trim());
            if (selected.length > 0) {
                answers['q2'] = selected;
            } else {
                delete answers['q2'];
            }
            console.log('Saved Q2 answers:', answers['q2']);
        } else if (currentQuestion === 3) {
            const selected = document.querySelector('.learning-reason-box.selected');
            if (selected) {
                answers['q3'] = selected.querySelector('.learning-reason-text').textContent.trim();
            } else {
                delete answers['q3'];
            }
            console.log('Saved Q3 answer:', answers['q3']);
        } else if (currentQuestion === 4) {
            const selected = document.querySelector('.learning-level-box.selected');
            if (selected) {
                answers['q4'] = selected.querySelector('.learning-level-text').textContent.trim();
            } else {
                delete answers['q4'];
            }
            console.log('Saved Q4 answer:', answers['q4']);
        } else if (currentQuestion === 5) {
            const selected = document.querySelector('.hear-box.selected');
            if (selected) {
                answers['q5'] = selected.querySelector('.hear-text').textContent.trim();
            } else {
                delete answers['q5'];
            }
            console.log('Saved Q5 answer:', answers['q5']);
        }
    }

    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const searchBar = document.querySelector('.search-bar');
    const optionList = document.querySelectorAll('.option-list li');
    const frameChild = document.querySelector('.frame-child');
    const learningLanguageBoxes = document.querySelectorAll('.learning-language-box');
    const learningReasonBoxes = document.querySelectorAll('.learning-reason-box');
    const learningLevelBoxes = document.querySelectorAll('.learning-level-box');
    const hearBoxes = document.querySelectorAll('.hear-box');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('active');
            console.log('Dropdown menu toggled. Active:', dropdownMenu.classList.contains('active'));
        });
    }

    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            optionList.forEach(option => {
                const text = option.textContent.toLowerCase();
                option.style.display = text.includes(searchTerm) ? 'block' : 'none';
            });
        });
    }

    optionList.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('selected');
            const selectedOptions = Array.from(document.querySelectorAll('.option-list li.selected'))
                .map(opt => opt.textContent.trim());
            if (selectedOptions.length === 0) {
                frameChild.textContent = '';
                frameChild.classList.remove('has-selections');
                dropdownBtn.childNodes[0].textContent = 'Choose a language you speak';
                dropdownBtn.classList.remove('has-selections');
            } else if (selectedOptions.length <= 2) {
                frameChild.textContent = selectedOptions.join(', ');
                frameChild.classList.add('has-selections');
                dropdownBtn.childNodes[0].textContent = selectedOptions.join(', ');
                dropdownBtn.classList.add('has-selections');
            } else {
                frameChild.textContent = `${selectedOptions.length} languages selected`;
                dropdownBtn.childNodes[0].textContent = `${selectedOptions.length} languages selected`;
                frameChild.classList.add('has-selections');
                dropdownBtn.classList.add('has-selections');
            }
            saveAnswer();
        });
    });

    learningLanguageBoxes.forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('selected');
            saveAnswer();
        });
    });

    learningReasonBoxes.forEach(box => {
        box.addEventListener('click', () => {
            learningReasonBoxes.forEach(b => b.classList.remove('selected')); // Single-select
            box.classList.add('selected');
            saveAnswer();
        });
    });

    learningLevelBoxes.forEach(box => {
        box.addEventListener('click', () => {
            learningLevelBoxes.forEach(b => b.classList.remove('selected')); // Single-select
            box.classList.add('selected');
            saveAnswer();
        });
    });

    hearBoxes.forEach(box => {
        box.addEventListener('click', () => {
            hearBoxes.forEach(b => b.classList.remove('selected')); // Single-select
            box.classList.add('selected');
            saveAnswer();
        });
    });

    document.querySelectorAll('#back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Back button clicked, currentQuestion:', currentQuestion);
            saveAnswer();
            if (currentQuestion > 1) {
                showQuestion(currentQuestion - 1);
            } else {
                console.log('Already at first question, no navigation performed');
                showQuestion(1);
            }
        });
    });

    document.querySelectorAll('#next-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next button clicked, currentQuestion:', currentQuestion);
            saveAnswer();
            if (currentQuestion < totalQuestions) {
                showQuestion(currentQuestion + 1);
            } else {
                console.log('At last question, showing results');
                document.querySelectorAll('.question-section').forEach(section => {
                    section.style.display = 'none';
                });
                const resultElement = document.querySelector('#result');
                if (resultElement) {
                    resultElement.style.display = 'block';
                    const answersElement = document.querySelector('#answers');
                    if (answersElement) {
                        answersElement.innerHTML = Object.entries(answers).map(([q, a]) => 
                            `Question ${q.replace('q', '')}: ${Array.isArray(a) ? a.join(', ') : a}`
                        ).join('<br>') || 'No answers selected.';
                    }
                } else {
                    console.warn('Result element (#result) not found, logging answers to console');
                    console.log('Submitted answers:', answers);
                }
            }
        });
    });

    // Expose answers for future fetch call
    window.getQuizAnswers = () => answers;

    updateButtons();
    showQuestion(1);
});