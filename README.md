# README

Wellington Johnson's Hudu Workflow Builder Submission

## Overview

This is a Rails application that implements a workflow builder interface for Hudu. The application provides a step-by-step wizard for creating workflows based on various criteria, triggers, and actions.

I used the browser's native localStorage to handle the builder's state, and implemented as much as I could without setting up a more permanent data store. Attempted to use as much Hotwire (both stimulus and turbo) as possible while simplifying the amount of files needed, although you could argue we could have used discrete controller actions and/or pages for each step to accomodate more complex logic if needed. 

Overall, I went with what felt like the simplest implementation to me.

P.S. Some actions aren't implemented for time sake.

## Instructions

1. Clone the repository
2. Run `bin/setup` to install dependencies and setup the database
3. Run `bin/dev` to start the development server

