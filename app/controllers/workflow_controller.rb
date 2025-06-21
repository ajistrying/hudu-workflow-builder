class WorkflowController < ApplicationController
  STEPS = %w[criteria_one criteria_two trigger action review].freeze
  
  def show
    @step = params[:step] || 'criteria_one'
    redirect_to workflow_path(step: 'criteria_one') unless STEPS.include?(@step)
    
    respond_to do |format|
      format.html
      format.turbo_stream { render turbo_stream: turbo_stream.replace("workflow_content", partial: "workflow/steps/#{@step}") }
    end
  end
end