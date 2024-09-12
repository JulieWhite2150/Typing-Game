    const sentences = [
      "The quick brown fox jumps over the lazy dog."
    ];

    const sentenceDisplay = document.getElementById('sentence-display');
    const typingArea = document.getElementById('typing-area');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');

    let timer, startTime, timeElapsed, wordCount, charCount;
    let didStart = false;

     const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
     sentenceDisplay.textContent = randomSentence;
     typingArea.disabled = false;
     typingArea.value = "";
     typingArea.focus();
     typingArea.addEventListener('input', checkInput);

    function startGame() {
      startTime = new Date();
      timer = setInterval(() => {
        timeElapsed = (new Date() - startTime) / 1000;
        timeDisplay.textContent = timeElapsed.toFixed(1);
      }, 100);
    }

    function checkInput() {
      if (!didStart){
           didStart = true;
           startGame();
      }

      const userInput = typingArea.value;
      const originalText = sentenceDisplay.textContent;

      // Calculate accuracy
      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === originalText[i]) {
          correctChars++;
        }
      }
      const accuracy = (correctChars / originalText.length) * 100;
      accuracyDisplay.textContent = accuracy.toFixed(1);

      // Check if typing is complete
      if (userInput === originalText) {
        clearInterval(timer);
        typingArea.disabled = true;

        // Calculate WPM
        const timeInMinutes = timeElapsed / 60;
        const wpm = (originalText.length / 5) / timeInMinutes;
        wpmDisplay.textContent = wpm.toFixed(1);
      }
    }
