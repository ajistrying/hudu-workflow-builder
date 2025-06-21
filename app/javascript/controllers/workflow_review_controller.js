import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	static targets = [
		"triggerContent",
		"criteriaOneContent",
		"criteriaTwoContent",
		"actionContent",
	];

	connect() {
		localStorage.setItem("current_step", "review");
		this.loadWorkflowData();
	}

	loadWorkflowData() {
		this.loadTriggerData();
		this.loadCriteriaOneData();
		this.loadCriteriaTwoData();
		this.loadActionData();
	}

	loadTriggerData() {
		const triggerChoice = localStorage.getItem("workflow_trigger_choice");
		const triggerData = this.getTriggerData();
		const selectedTrigger = triggerData.find((trigger) => trigger.value === triggerChoice);

		if (selectedTrigger && this.hasTriggerContentTarget) {
			this.triggerContentTarget.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-lg">${selectedTrigger.icon}</span>
          <span class="text-sm text-gray-700">${selectedTrigger.label}</span>
        </div>
      `;
		}
	}

	loadCriteriaOneData() {
		const criteriaOneChoice = localStorage.getItem("workflow_criteria_one_choice");
		const criteriaOneData = this.getCriteriaOneData();
		const selectedCriteria = criteriaOneData.find(
			(criteria) => criteria.value === criteriaOneChoice
		);

		if (selectedCriteria && this.hasCriteriaOneContentTarget) {
			this.criteriaOneContentTarget.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-lg">${selectedCriteria.icon}</span>
          <span class="text-sm text-gray-700">${selectedCriteria.label}</span>
        </div>
      `;
		}
	}

	loadCriteriaTwoData() {
		const criteriaTwoChoices = JSON.parse(
			localStorage.getItem("workflow_criteria_two_choices") || "[]"
		);
		const criteriaTwoData = this.getCriteriaTwoData();
		const selectedCriteria = criteriaTwoData.filter((criteria) =>
			criteriaTwoChoices.includes(criteria.value)
		);

		if (selectedCriteria.length > 0 && this.hasCriteriaTwoContentTarget) {
			const html = selectedCriteria
				.map(
					(criteria) => `
        <div class="flex items-center gap-2 mb-1">
          <span class="text-lg">${criteria.icon}</span>
          <span class="text-sm text-gray-700">${criteria.label}</span>
        </div>
      `
				)
				.join("");

			this.criteriaTwoContentTarget.innerHTML = html;
		}
	}

	loadActionData() {
		const actionChoice = localStorage.getItem("workflow_action_choice");
		const actionData = this.getActionData();
		const selectedAction = actionData.find((action) => action.value === actionChoice);

		if (selectedAction && this.hasActionContentTarget) {
			this.actionContentTarget.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-lg">${selectedAction.icon}</span>
          <span class="text-sm text-gray-700">${selectedAction.label}</span>
        </div>
      `;
		}
	}

	// Data definitions matching the view files
	getTriggerData() {
		return [
			{ icon: "➕", label: "Record created", value: "record_created" },
			{ icon: "✏️", label: "Record updated", value: "record_updated" },
		];
	}

	getCriteriaOneData() {
		return [
			{ icon: "🏢", label: "Company", value: "company" },
			{ icon: "📋", label: "Record", value: "record" },
			{ icon: "🌐", label: "Website", value: "website" },
			{ icon: "📅", label: "Expiration", value: "expiration" },
			{ icon: "👤", label: "User", value: "user" },
			{ icon: "👥", label: "Group", value: "group" },
			{ icon: "🧩", label: "Integration", value: "integration" },
		];
	}

	getCriteriaTwoData() {
		return [
			{ icon: "🔑", label: "Password", value: "password" },
			{ icon: "📄", label: "Company KB article", value: "company_kb_article" },
			{ icon: "📄", label: "Central KB article", value: "central_kb_article" },
			{ icon: "✓", label: "Process", value: "process" },
			{ icon: "🌐", label: "Website", value: "website" },
			{ icon: "≡", label: "Rack", value: "rack" },
			{ icon: "🔗", label: "Network", value: "network" },
			{ icon: "⭕", label: "Asset", value: "asset" },
		];
	}

	getActionData() {
		return [
			{ icon: "🚩", label: "Add flag", value: "add_flag" },
			{ icon: "📧", label: "Send email", value: "send_email" },
			{ icon: "🔗", label: "Send webhook", value: "send_webhook" },
		];
	}
}
