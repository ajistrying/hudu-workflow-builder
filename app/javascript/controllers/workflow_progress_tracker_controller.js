import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	connect() {
		setTimeout(() => {
			this.updateStepProgress();
		}, 100);

		// Listen for step changes via custom event
		this.boundUpdateStepProgress = this.updateStepProgress.bind(this);
		document.addEventListener("workflow:step-changed", this.boundUpdateStepProgress);

		// Listen for Turbo Frame navigation as backup
		document.addEventListener("turbo:frame-load", this.boundUpdateStepProgress);
	}

	disconnect() {
		document.removeEventListener("workflow:step-changed", this.boundUpdateStepProgress);
		document.removeEventListener("turbo:frame-load", this.boundUpdateStepProgress);
	}

	updateStepProgress() {
		const steps = ["Criteria", "Trigger", "Action", "Review"];
		const currentStep = localStorage.getItem("current_step") || "criteria_one";

		// Determine current step index based on our step flow
		let currentStepIndex;
		switch (currentStep) {
			case "criteria_one":
			case "criteria_two":
				currentStepIndex = 0; // Both criteria steps are part of the first progress step
				break;
			case "trigger":
				currentStepIndex = 1;
				break;
			case "action":
				currentStepIndex = 2;
				break;
			case "review":
				currentStepIndex = 3;
				break;
			default:
				currentStepIndex = 0;
		}

		// Criteria is only completed when we're past both criteria steps (i.e., on trigger or later)
		const isCriteriaCompleted = ["trigger", "action", "review"].includes(currentStep);

		steps.forEach((stepName, index) => {
			const stepElements = document.querySelectorAll(`[data-step='${stepName}']`);

			stepElements.forEach((element) => {
				element.classList.remove("step-current", "step-completed", "step-incomplete");

				if (stepName === "Criteria" && isCriteriaCompleted) {
					// Criteria is completed only when we're on trigger or later steps
					element.classList.add("step-completed");
					element.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="white" stroke="white" stroke-width="1.5"/>
            </svg>
          `;
				} else if (index < currentStepIndex) {
					element.classList.add("step-completed");
					element.innerHTML = `
            <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="white" stroke="white" stroke-width="1.5"/>
            </svg>
          `;
				} else if (index === currentStepIndex) {
					element.classList.add("step-current");
					element.innerHTML = "";
				} else {
					element.classList.add("step-incomplete");
					element.innerHTML = "";
				}
			});
		});
	}
}
