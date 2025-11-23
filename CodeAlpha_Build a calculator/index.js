
		const displayElement = document.getElementById('current-display');
		const equationElement = document.getElementById('equation-text');
		const themeToggle = document.getElementById('theme-toggle'); 
		const sunIcon = document.getElementById('sun-icon');
		const moonIcon = document.getElementById('moon-icon');

		let display = '0';
		let equation = '';
		let lastResult = null; // Store the result of the previous operation
		let isDark = document.documentElement.classList.contains('dark');

		// Helper function for safe evaluation
		const calculate = (expr) => {
			try {
				const safeExpr = expr.replace(/×/g, '*').replace(/÷/g, '/');
				let result = eval(safeExpr);
				return parseFloat(result.toFixed(10)); // Fixed precision
			} catch (error) {
				console.error("Calculation Error:", error);
				return 'Error';
			}
		};

		// --- State Management and UI Update Functions ---
		const updateDisplay = () => {
			displayElement.textContent = display;

			if (equation) {
				equationElement.textContent = equation;
				equationElement.style.display = 'block';
				// Scroll the equation history to the right to see the most recent input
				equationElement.scrollLeft = equationElement.scrollWidth;
			} else {
				equationElement.style.display = 'none';
			}
		};

		const toggleThemeIcons = () => {
			if (isDark) {
				sunIcon.style.display = 'block';
				moonIcon.style.display = 'none';
			} else {
				sunIcon.style.display = 'none';
				moonIcon.style.display = 'block';
			}
		};

		// Initialize theme icons
		toggleThemeIcons();


		// --- Calculator Logic Functions (UPDATED) ---

		const handleNumber = (num) => {
			if (display === '0' || display === String(lastResult)) {
				display = num;
			} else {
				display += num;
			}
			lastResult = null;
			updateDisplay();
		};

		const handleOperator = (newOp) => {
			if (display === 'Error') return;

			// 1. If an equation exists, calculate the current expression first
			if (equation) {
				const currentExpr = equation + display;
				const result = calculate(currentExpr);
                
				if (result === 'Error') {
					display = 'Error';
					equation = '';
				} else {
					// Update the display with the intermediate result
					display = String(result);
					// Update the equation for history: just the result and the new operator
					equation = String(result) + ' ' + newOp + ' ';
					lastResult = result;
					display = '0'; // Ready for the next number
				}
			} 
			// 2. If no equation, start a new one
			else {
				// If the user presses an operator immediately after an equals, use the result as the start
				if (lastResult !== null) {
					equation = String(lastResult) + ' ' + newOp + ' ';
					display = '0';
				} else {
					equation = display + ' ' + newOp + ' ';
					display = '0';
				}
			}
			lastResult = null; // Clear lastResult as a new operation is starting
			updateDisplay();
		};

		const handleEquals = () => {
			if (!equation || display === 'Error') return; 

			const fullEquation = equation + display;
			const result = calculate(fullEquation);

			if (result === 'Error') {
				display = 'Error';
			} else {
				display = String(result);
				lastResult = result; // Store result for subsequent chain operations (e.g., hitting = multiple times)
			}
			equation = ''; // Clear history after equals
			updateDisplay();
		};

		const handleClear = () => {
			display = '0';
			equation = '';
			lastResult = null;
			updateDisplay();
		};

		const handleSign = () => {
			if (display !== '0' && display !== 'Error') {
				display = String(-parseFloat(display));
				updateDisplay();
			}
		};

		const handlePercent = () => {
			if (display !== 'Error') {
				display = String(parseFloat(display) / 100);
				updateDisplay();
			}
		};

		const handleDecimal = () => {
			if (!display.includes('.')) {
				display += '.';
				updateDisplay();
			}
		};

		const toggleTheme = () => {
			isDark = !isDark;
			document.documentElement.classList.toggle('dark');
			toggleThemeIcons();
		};

		// --- Event Listeners (Unchanged) ---

		document.querySelector('.button-grid').addEventListener('click', (event) => {
			const button = event.target.closest('.calc-button');
			if (!button) return;

			const value = button.dataset.value;
			const action = button.dataset.action;

			if (value && !action) {
				handleNumber(value);
			} else if (action === 'operator') {
				handleOperator(value);
			} else if (action === 'equals') {
				handleEquals();
			} else if (action === 'clear') {
				handleClear();
			} else if (action === 'sign') {
				handleSign();
			} else if (action === 'percent') {
				handlePercent();
			} else if (action === 'decimal') {
				handleDecimal();
			}
		});

		themeToggle.addEventListener('click', toggleTheme);
		updateDisplay();
