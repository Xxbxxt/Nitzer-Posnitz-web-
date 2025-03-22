  // Initialize Sales Chart
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  new Chart(salesCtx, {
      type: 'line',
      data: {
          labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM'],
          datasets: [{
              label: 'Sales ($)',
              data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
              borderColor: '#2563eb',
              tension: 0.4
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  // Calendar Functionality
  function generateCalendar() {
      const calendarBody = document.getElementById('calendarBody');
      const date = new Date(2022, 3); // April 2022
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      let html = '';
      let day = 1;
      
      for (let i = 0; i < 6; i++) {
          html += '<tr>';
          for (let j = 0; j < 7; j++) {
              if (i === 0 && j < firstDay.getDay()) {
                  html += '<td></td>';
              } else if (day > lastDay.getDate()) {
                  html += '<td></td>';
              } else {
                  html += `<td ${day === 5 ? 'class="today"' : ''}>${day}</td>`;
                  day++;
              }
          }
          html += '</tr>';
          if (day > lastDay.getDate()) break;
      }

      calendarBody.innerHTML = html;
  }

  generateCalendar();

  // Populate Comments
  const comments = [
      { user: 'Elon S.', text: 'Find my keynote attached in the...' },
      { user: 'Dana R.', text: 'I\'ve added some new data...' }
  ];

  const commentsList = document.querySelector('.comments-list');
  comments.forEach(comment => {
      const commentEl = document.createElement('div');
      commentEl.className = 'comment';
      commentEl.innerHTML = `
          <strong>${comment.user}</strong>
          <p>${comment.text}</p>
      `;
      commentsList.appendChild(commentEl);
  });

  // Add Business Advice
  const adviceContent = document.querySelector('.advice-content');
  adviceContent.innerHTML = `
      <p>"Focus on customer experience first. Everything else will follow."</p>
      <small>- Business Insight for April 5, 2022</small>
  `;