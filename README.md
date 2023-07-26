**This project is still under development, please keep this in mind when using it.  [more below](#warning-warning)**

## Introduction

This is a project management software that is open source and self-hostable. It is built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Motivation

While working on my various personal projects, I found the need for project management software to help with planning out my projects and tracking my progress. I tried a few different [FOSS](https://itsfoss.com/what-is-foss/) options, but most of them don't fit my needs, and the ones that do often doesn't look very modern or _aesthetically pleasing_. 

It was after venturing into commercial options that I was able to find a few that I liked, but those often have features locked behind a paywall and most importantly, they store all my data on their servers. I put a lot of importance into having control over my data, and I don't want to be locked into a service that I can't control.

Hence I decided to build my own, one that suits my use case and looks good (for me), as well as being open source and self-hostable so that others can use it too.


## Getting Started

Before you start, you will need to create a new MySQL database. You can name it whatever you want.

After you've done that, clone the repository and install the dependencies.

```bash
$ git clone git@github.com:Jaee-C/planify.git
$ cd planify
$ npm install
```

Next, create a `.env` file in the root directory of the project and fill in the following fields (replacing the `xxxx` with valid values).
```bash
DATABASE_URL=mysql://xxxxxxxxx
NEXTAUTH_SECRET=xxxxxxx
```

Here are what the fields mean:
- `DATABASE_URL`: This URL should be in the format of `mysql://<username>:<password>@<host>:<port>/<database>`, and it links to the MySQL database that you have created for this application
- `NEXTAUTH_SECRET`: This is a secret key that is used by [next-auth](https://next-auth.js.org/) to encrypt the session token. You can generate one by running the following command.
```bash
$ openssl rand -base64 32
```

Then, build the program and start the server.
```bash
$ npm run build
$ npm run start
```

Finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result. 

Note that this method will only allow the server to be accessible from the machine you are running the commands on. To make it available to other machines, you can search up various guides online on how to do so.

To run the development server, run the following command instead.
```bash
npm run dev
```

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v8 or higher)

## :warning: Warning

This project is still under early-stage development. The security of this service is still untested, and there are still many features that are not implemented yet. Please keep this in mind when using it.

**You should not put sensitive information, or use this service for anything important. Please do not re-use passwords for this service, only use unimportant credentials.**

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE](LICENSE) file for details.