+++
date = '2025-02-26T21:19:12+08:00'
draft = false
type = "posts"
title = 'Blogger Alternative'
+++

I love to write, I still do. When I started reading articles, I would take notes along with these articles.
Google Blogger was a way for me to store my notes.

I wanted to improve my writing experience - so I decided to create a wrapper that uses the Google Blogger API to store posts.

## Iterations

The project went through 3 iterations:

### Frontend

The first iteration was a MERN stack app that allowed me to create posts in a Markdown/WYSIWYG editor, view and delete posts. Posts could also be downloaded as a Word document.

I could not figure out how to handle Google OAuth authentication in this iteration, so the posts were stored in a local Mongodb backend. However, it was one of my first major frontend projects and I learnt a lot about frontend - React, design libraries, npm package management.

### Backend

The second iteration built on the first iteration and implemented a backend that calls the Google Blogger API internally.

### Revamped editor (current)

Since Google Blogger, I moved to Notion, Obsidian, and more recently, Logseq. I value a text editor that allows me to use files locally instead of a remote service, so there has been little motivation for me to continue developing this app for my own use.

I do like the user experience of Notion/Obsidian/Logseq - I like that I can use Markdown, reference and jump to pages easily. A new editor is on the way, albeit very slowly.