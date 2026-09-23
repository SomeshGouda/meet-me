# Meet Me — Interactive Invitation

A pastel, multi-step invitation website inspired by the reference video.

## What it does
- Interactive Yes / Maybe / Not this time screen
- Date + time selection
- Plan/vibe selection
- Optional message
- Email submission
- Instagram DM button
- Mobile responsive
- Works as a static site on GitHub Pages

## Before publishing

Open `script.js` and change:

```js
YOUR_EMAIL: "cx27somesh",
INSTAGRAM_USERNAME: "somesh___09",
```

For email delivery, the form uses FormSubmit. On the first submission, FormSubmit sends a confirmation email to the configured address; confirm it once before relying on the form. See https://formsubmit.co/ for details.

For Instagram, enter only the username, without `@`. The button opens Instagram's DM route; the visitor still chooses and sends the message themselves.

## GitHub Pages

Upload `index.html`, `style.css`, and `script.js` to a repository, then enable GitHub Pages from Settings → Pages and publish from your chosen branch/folder.

GitHub Pages supports static HTML/CSS/JS sites.
