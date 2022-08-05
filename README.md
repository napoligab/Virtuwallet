# Virtwallet

<br>

## Description

A virtual wallet that allows the user to register and control his or her expenses.

<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage to view my expenses, add new ones, edit, delete them, and filter by period.
- **sign up** - As a user I want to sign up on the web page so that I can create my virtual wallet.
- **login** - As a user I want to be able to log in to the app so that I can get back to my wallet.
- **logout** - As a user I want to be able to log out from the app so that I can make sure no one will access my wallet.
- **edit user** - As a user I want to be able to edit my profile.

<br>

## Server Routes (Back-end):

| **Method** | **Route**                    | **Description**                                                          | Request - Body                                       |
| ---------- | ---------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------- | --- |
| `GET`      | `/`                          | Main page route. Renders home `index` view.                              |                                                      |
| `GET`      | `/login`                     | Renders `login` form view.                                               |                                                      |
| `POST`     | `/login`                     | Sends Login form data to the server.                                     | { email, password }                                  |
| `GET`      | `/signup`                    | Renders `signup` form view.                                              |                                                      |
| `POST`     | `/signup`                    | Sends Sign Up info to the server and creates user in the DB.             | { email, password }                                  |
| `GET`      | `/edit-profile`              | Private route. Renders `edit-profile` form view.                         |                                                      |
| `POST`     | `/edit-profile`              | Private route. Sends edit-profile info to server and updates user in DB. | { email, firstName, lastName, password, [imageUrl] } |
| `GET`      | `/dashboard`                 | Private route. Render the user's `expenses` list, if there's any.        |                                                      |
| `POST`     | `/dashboard/expense/add/`    | Private route. Adds a new expense.                                       | { date, amount, category, location }                 |
| `POST`     | `/dashboard/expense/delete/` | Private route. Deletes the selected expense.                             |                                                      |
| `POST`     | `/dashboard/expense/edit/`   | Private route. Edits the selected expense.                               |                                                      |     |

## Models

User model

```javascript
{
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  profileImage: File
}

```

Expenses model

```javascript
{
  date: Date,
  amount: Number,
  category: [String],
  location: String
}

```

<br>

## API's

<br>

## Packages

[Chart.js](https://www.chartjs.org/) (bonus)

<br>

## Backlog

[See the Trello board.](https://trello.com/invite/b/NSAxCDnG/76c35ceb3941a215def323428b7fb120/chinchito)

<br>

## Links

### Git

[Repository Link](https://github.com/napoligab/Project2)

[Deploy Link](https://jul22gabre.herokuapp.com/)

<br>

### Slides

The url to your presentation slides

[Slides Link]() TBD

### Contributors

Gabriella N H - [`GitHub`](https://github.com/napoligab) - [`LinkedIn`](https://www.linkedin.com/in/napoligabriella/)

Brenda Lopes - [`GitHub`](https://github.com/Brenda-Lop) - [`LinkedIn`](https://www.linkedin.com/in/brenda--lopes/)
