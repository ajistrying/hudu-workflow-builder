import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	connect() {
		setTimeout(() => {
			this.updateStepProgress();
		}, 100);
	}

	updateStepProgress() {
		const steps = ["Criteria", "Trigger", "Action", "Review"];

		const currentStep = localStorage.getItem("current_step") || "criteria";

		const stepMapping = {
			criteria: "Criteria",
			trigger: "Trigger",
			action: "Action",
			review: "Review",
		};

		const currentStepName = stepMapping[currentStep];
		const currentStepIndex = steps.indexOf(currentStepName);

		steps.forEach((stepName, index) => {
			const stepElements = document.querySelectorAll(`[data-step='${stepName}']`);

			stepElements.forEach((element) => {
				element.classList.remove("step-current", "step-completed", "step-incomplete");

				if (index < currentStepIndex) {
					element.classList.add("step-completed");
					element.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="white" stroke="white" stroke-width="1.5"/>
            </svg>
          `;
				} else if (index === currentStepIndex) {
					element.classList.add("step-current");
				} else {
					element.classList.add("step-incomplete");
				}
			});
		});
	}
}
