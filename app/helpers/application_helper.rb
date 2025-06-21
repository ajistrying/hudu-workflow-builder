module ApplicationHelper
  def workflow_step_config(step)
    case step
    when 'criteria_one'
      {
        step: 'criteria_one',
        storage_key: 'workflow_criteria_one_choice',
        multi_select: false,
        title: 'What will this workflow be based on?',
        choices: [
          { icon: "🏢", label: "Company", value: "company" },
          { icon: "📋", label: "Record", value: "record" },
          { icon: "🌐", label: "Website", value: "website" },
          { icon: "📅", label: "Expiration", value: "expiration" },
          { icon: "👤", label: "User", value: "user" },
          { icon: "👥", label: "Group", value: "group" },
          { icon: "🧩", label: "Integration", value: "integration" }
        ],
        next_path: workflow_path(step: 'criteria_two'),
        back_path: nil,
        show_save_later: false
      }
    when 'criteria_two'
      {
        step: 'criteria_two',
        storage_key: 'workflow_criteria_two_choices',
        multi_select: true,
        title: 'What record types will be included in this workflow?',
        choices: [
          { icon: "🔑", label: "Password", value: "password" },
          { icon: "📄", label: "Company KB article", value: "company_kb_article" },
          { icon: "📄", label: "Central KB article", value: "central_kb_article" },
          { icon: "✓", label: "Process", value: "process" },
          { icon: "🌐", label: "Website", value: "website" },
          { icon: "≡", label: "Rack", value: "rack" },
          { icon: "🔗", label: "Network", value: "network" },
          { icon: "⭕", label: "Asset", value: "asset" }
        ],
        next_path: workflow_path(step: 'trigger'),
        back_path: workflow_path(step: 'criteria_one'),
        show_save_later: false
      }
    when 'trigger'
      {
        step: 'trigger',
        storage_key: 'workflow_trigger_choice',
        multi_select: false,
        title: 'What should trigger this workflow?',
        choices: [
          { icon: "➕", label: "Record created", value: "record_created" },
          { icon: "✏️", label: "Record updated", value: "record_updated" }
        ],
        next_path: workflow_path(step: 'action'),
        back_path: workflow_path(step: 'criteria_two'),
        show_save_later: true,
        show_add_condition: true
      }
    when 'action'
      {
        step: 'action',
        storage_key: 'workflow_action_choice',
        multi_select: false,
        title: 'What should happen once the workflow begins?',
        subtitle: 'Select at least 1 action to continue. You can add additional actions later.',
        choices: [
          { icon: "🚩", label: "Add flag", value: "add_flag" },
          { icon: "📧", label: "Send email", value: "send_email" },
          { icon: "🔗", label: "Send webhook", value: "send_webhook" }
        ],
        next_path: workflow_path(step: 'review'),
        back_path: workflow_path(step: 'trigger'),
        show_save_later: true
      }
    when 'review'
      {
        step: 'review',
        storage_key: nil,
        multi_select: false,
        title: 'Review your workflow below. Click a step to make edits if needed.',
        choices: [],
        next_path: nil,
        back_path: workflow_path(step: 'action'),
        show_save_later: true,
        next_label: 'Save Draft'
      }
    else
      {}
    end
  end
end
