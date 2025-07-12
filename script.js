document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    const buttons = document.querySelectorAll('.buttons button');

    let currentExpression = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();

            if (button.classList.contains('clear')) {
                currentExpression = '';
                resultInput.value = '';
            } else if (button.classList.contains('equals')) {
                try {
                    // แทนที่ √ ด้วย Math.sqrt และจัดการกับ x² และ x³
                    let expressionToEvaluate = currentExpression
                        .replace(/x²/g, '**2')
                        .replace(/x³/g, '**3')
                        .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)'); // จัดการเฉพาะตัวเลขที่ตามหลัง √

                    // เพิ่มการจัดการกับวงเล็บ
                    // สำหรับ Math.sqrt(expression) ที่อาจมีวงเล็บ
                    expressionToEvaluate = expressionToEvaluate.replace(/√\(([^)]*)\)/g, (match, expr) => `Math.sqrt(${expr})`);

                    // ใช้ eval อย่างระมัดระวัง เพราะอาจมีช่องโหว่ด้านความปลอดภัย
                    // ในบริบทของเครื่องคิดเลขส่วนตัว ถือว่ายอมรับได้
                    const result = eval(expressionToEvaluate);
                    resultInput.value = result;
                    currentExpression = result.toString();
                } catch (e) {
                    resultInput.value = 'Error';
                    currentExpression = '';
                }
            } else if (button.classList.contains('function')) {
                const func = button.dataset.func;
                if (func === 'pow2') {
                    currentExpression += '**2';
                } else if (func === 'pow3') {
                    currentExpression += '**3';
                } else if (func === 'sqrt') {
                    // เพิ่ม √ เข้าไปรอรับตัวเลขหรือวงเล็บ
                    currentExpression += '√';
                }
                resultInput.value = currentExpression;
            } else {
                currentExpression += buttonText;
                resultInput.value = currentExpression;
            }
        });
    });
});