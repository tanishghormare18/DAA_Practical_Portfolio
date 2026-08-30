// ========================================
// LOAD PRACTICAL DATA
// ========================================

fetch("data/practicals.json")

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Could not load practicals.json"
            );

        }

        return response.json();

    })

    .then(practicals => {


        // --------------------------------
        // Practical Page
        // --------------------------------

        const practicalList =
            document.getElementById(
                "practical-list"
            );


        if (practicalList) {

            displayPracticals(practicals);

            updatePracticalProgress(
                practicals
            );

        }


        // --------------------------------
        // Home Page
        // --------------------------------

        const homeTotal =
            document.getElementById(
                "home-total"
            );


        if (homeTotal) {

            updateHomeProgress(
                practicals
            );

        }

    })


    .catch(error => {

        console.error(
            "Error loading practicals:",
            error
        );

    });



// ========================================
// DISPLAY PRACTICAL CARDS
// ========================================

function displayPracticals(practicals) {

    const container =
        document.getElementById(
            "practical-list"
        );


    container.innerHTML = "";


    practicals.forEach(practical => {


        const card =
            document.createElement("div");


        card.className =
            "practical-card";


        let buttons = "";


        if (practical.available) {

            buttons = `

                <div class="pdf-buttons">

                    <a
                        href="${practical.practicalPdf}"
                        target="_blank"
                        class="pdf-btn practical-pdf">

                        📄 Practical PDF

                    </a>


                    <a
                        href="${practical.codetantraPdf}"
                        target="_blank"
                        class="pdf-btn codetantra-pdf">

                        💻 Codetantra Output

                    </a>

                </div>

            `;

        }

        else {

            buttons = `

                <div class="coming-soon">

                    🔒 Practical files will be
                    uploaded soon.

                </div>

            `;

        }



        card.innerHTML = `

            <span class="practical-number">

                ${practical.number}

            </span>


            <h2>

                ${practical.title}

            </h2>


            <p class="problem-statement">

                <strong>
                    Problem Statement:
                </strong>

                ${practical.problemStatement}

            </p>


            <span class="algorithm">

                Algorithm / Concept:

                <strong>
                    ${practical.algorithm}
                </strong>

            </span>


            <div class="status
                ${
                    practical.available
                        ? "completed"
                        : "pending"
                }">

                ${
                    practical.available
                        ? "✓ Completed"
                        : "○ Pending"
                }

            </div>


            ${buttons}

        `;


        container.appendChild(card);

    });

}



// ========================================
// PRACTICAL PAGE PROGRESS
// ========================================

function updatePracticalProgress(
    practicals
) {

    const total =
        practicals.length;


    const completed =
        practicals.filter(
            practical =>
                practical.available
        ).length;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    const totalElement =
        document.getElementById(
            "total-count"
        );


    const completedElement =
        document.getElementById(
            "completed-count"
        );


    const progressFill =
        document.getElementById(
            "progress-fill"
        );


    const progressText =
        document.getElementById(
            "progress-text"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }


    if (progressText) {

        progressText.textContent =

            completed === 0

                ? "No practicals uploaded yet."

                : `${percentage}% of the practical collection is complete.`;

    }

}



// ========================================
// HOME PAGE PROGRESS
// ========================================

function updateHomeProgress(
    practicals
) {

    const total =
        practicals.length;


    const completed =
        practicals.filter(
            practical =>
                practical.available
        ).length;


    const remaining =
        total - completed;


    const percentage =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );



    const totalElement =
        document.getElementById(
            "home-total"
        );


    const completedElement =
        document.getElementById(
            "home-completed"
        );


    const remainingElement =
        document.getElementById(
            "home-remaining"
        );


    const percentageElement =
        document.getElementById(
            "home-percentage"
        );


    const progressFill =
        document.getElementById(
            "home-progress-fill"
        );



    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }


    if (remainingElement) {

        remainingElement.textContent =
            remaining;

    }


    if (percentageElement) {

        percentageElement.textContent =
            percentage + "%";

    }


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }

}