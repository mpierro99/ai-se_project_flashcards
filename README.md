# Flashcard App

My first project in TripleTen's AI-Assisted Software
Engineering program. It's a study app built around decks
of flashcards. Browse your decks, open a deck to review
its cards, and practice by flipping through them in a
carousel. Decks are stored in a database and loaded over a
remote API, so your work persists between visits. The app
is fully responsive, adapting its layout for both desktop
and mobile screens.

## Features

- A gallery of study decks, each with its own color and card count, loaded from a remote database on page load
- Create new decks with a form that takes a JSON list of cards and a color swatch. New decks are saved to the database and are immediately available to open, practice, and delete
- Input validation on the new deck form, covering malformed JSON, invalid deck names, a missing or malformed card array, and a color that conflicts with the selected swatch
- Errors surfaced to the user through a modal rather than the console. Failed network requests and invalid form input both report what went wrong
- An open deck view. Click a deck to see all of its flashcards, each showing a question with the answer revealed on flip
- Flip individual cards to reveal answers, and delete cards you no longer need
- A "Practice" mode that opens a deck in the carousel for focused review
- A carousel view for flipping through a deck's cards one at a time (question and answer), with previous/next navigation
- Delete a deck from the gallery. The deck is removed from the database, and only disappears from the page once the server confirms it
- Hash-based routing between the home, deck, carousel, new deck, about, and 404 views
- An About page documenting the app and the JSON schema the new deck form expects
- Fully responsive design. Layouts, card sizing, and navigation adapt to mobile screens, including a fixed action bar for creating decks and cards, and a rearranged carousel on small viewports
- Decks and cards rendered dynamically from data using HTML templates

## Technologies used

- HTML
- CSS (with BEM naming convention), organized into per-block files
- CSS Grid and Flexbox for layout
- Responsive design with media queries
- Vanilla JavaScript (ES modules)
- The Fetch API for GET, POST, and DELETE requests against a REST API
- Promise chaining with `.then()`, `.catch()`, and `.finally()` for asynchronous flow and error handling
- The HTML `<template>` element for dynamic rendering
- JSDoc comments documenting every named function, its parameters, and its return type
- Git and GitHub (deployed with GitHub Pages)

## Deployed Site

Check out [this site](https://mpierro99.github.io/ai-se_project_flashcards) on GitHub Pages.

## Project Pitch Video

Check out https://www.loom.com/share/4acaeb65b2154f9686257b19365723c9, where I describe my project and some challenges I faced while building it.
