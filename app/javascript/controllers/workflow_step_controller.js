import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
	static targets = ["choice", "nextButton", "selectAllCheckbox"];
	static values = {
		step: String,
		storageKey: String,
		multiSelect: { type: Boolean, default: false },
	};

	connect() {
		localStorage.setItem("current_step", this.stepValue);
		this.restoreSelections();
		this.updateNextButton();
		if (this.multiSelectValue) {
			this.updateSelectAllCheckbox();
		}
	}

	choice(event) {
		const choiceValue = event.currentTarget.dataset.choice;

		if (this.multiSelectValue) {
			this.handleMultiChoice(choiceValue, event.currentTarget);
		} else {
			this.handleSingleChoice(choiceValue, event.currentTarget);
		}

		this.updateNextButton();
		if (this.multiSelectValue) {
			this.updateSelectAllCheckbox();
		}
	}

	selectAll(event) {
		if (!this.multiSelectValue) return;

		const isChecked = this.selectAllCheckboxTarget.checked;
		const allChoices = this.choiceTargets;

		if (isChecked) {
			// Select all choices
			const allValues = allChoices.map((choice) => choice.dataset.choice);
			localStorage.setItem(this.storageKeyValue, JSON.stringify(allValues));
			allChoices.forEach((choice) => this.addSelection(choice));
		} else {
			// Deselect all choices
			localStorage.setItem(this.storageKeyValue, JSON.stringify([]));
			allChoices.forEach((choice) => this.removeSelection(choice));
		}

		this.updateNextButton();
	}

	handleSingleChoice(value, element) {
		localStorage.setItem(this.storageKeyValue, value);

		// Reset all choices
		this.choiceTargets.forEach((choice) => {
			this.removeSelection(choice);
		});

		// Select current choice
		this.addSelection(element);
	}

	handleMultiChoice(value, element) {
		const currentSelections = JSON.parse(localStorage.getItem(this.storageKeyValue) || "[]");
		const isSelected = currentSelections.includes(value);

		let newSelections;
		if (isSelected) {
			newSelections = currentSelections.filter((choice) => choice !== value);
			this.removeSelection(element);
		} else {
			newSelections = [...currentSelections, value];
			this.addSelection(element);
		}

		localStorage.setItem(this.storageKeyValue, JSON.stringify(newSelections));
	}

	addSelection(element) {
		element.classList.remove("bg-white", "border-gray-300", "hover:bg-gray-50");
		element.classList.add("bg-blue-100", "border-blue-500", "border-2");
	}

	removeSelection(element) {
		element.classList.remove("bg-blue-100", "border-blue-500", "border-2");
		element.classList.add("bg-white", "border-gray-300", "hover:bg-gray-50");
	}

	restoreSelections() {
		if (this.multiSelectValue) {
			const selections = JSON.parse(localStorage.getItem(this.storageKeyValue) || "[]");
			selections.forEach((value) => {
				const element = this.element.querySelector(`[data-choice="${value}"]`);
				if (element) {
					this.addSelection(element);
				}
			});
		} else {
			const selection = localStorage.getItem(this.storageKeyValue);
			if (selection) {
				const element = this.element.querySelector(`[data-choice="${selection}"]`);
				if (element) {
					this.addSelection(element);
				}
			}
		}
	}

	updateSelectAllCheckbox() {
		if (!this.multiSelectValue || !this.hasSelectAllCheckboxTarget) return;

		const currentSelections = JSON.parse(localStorage.getItem(this.storageKeyValue) || "[]");
		const allValues = this.choiceTargets.map((choice) => choice.dataset.choice);

		// Check if all choices are selected
		const allSelected =
			allValues.length > 0 && allValues.every((value) => currentSelections.includes(value));
		this.selectAllCheckboxTarget.checked = allSelected;
	}

	updateNextButton() {
		const hasSelection = this.multiSelectValue
			? JSON.parse(localStorage.getItem(this.storageKeyValue) || "[]").length > 0
			: localStorage.getItem(this.storageKeyValue);

		if (hasSelection) {
			this.nextButtonTarget.classList.remove(
				"opacity-50",
				"cursor-not-allowed",
				"pointer-events-none"
			);
		} else {
			this.nextButtonTarget.classList.add(
				"opacity-50",
				"cursor-not-allowed",
				"pointer-events-none"
			);
		}
	}
}
