<a href="https://vytvorkonverzku.cz">
  <h1 align="center">
    VYTVORKONVERZKU
  </h1>
</a>
<p align="center">
  Vytvorkonverzku is a free e-shop single page system. It is a simple and easy to use system for creating and managing an e-shop.
</p>
<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#built-with"><strong>Built with</strong></a> ·
  <a href="#how-to-install"><strong>How to install</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction
[Vytvorkonverzku](https://vytvorkonverzku.cz) is a free e-shop single page system. It is a simple and easy to use system for creating and managing an e-shop. The system is designed for small businesses and individuals who want to start selling online. The system is built with the latest technologies and is fully responsive. It is easy to use and can be customized to fit your needs. The system is free to use and can be downloaded and installed on your own server. The system is open source and can be modified and extended to fit your needs.

## Built with
- [Next.js](https://nextjs.org)
- [TypeScript](https://typescriptlang.org)
- [Prisma](https://prisma.io)
- [NextAuth.js](https://next-auth.js.org)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com)

## How to install
Instalation of Vytvorkonverzku is quite simple. It is designated to be used with Vercel, but can be used with any other hosting provider or on your own server. Here is a step by step guide on how to install Vytvorkonverzku:
# Vercel
 1. Step - Fork this repository
 2. Step - Go to vercel.app dashboard
 3. Step - Click on "Add New."
 4. Step - There click on "Project", you should see "Import Git Repository"
 5. Step - Find the repository you forked and click on it
 6. Step - Framework preset should be "Next.js" and root directory should be "./"
 7. Step - Now, we need to update our commands and environment variables
    - Build and Output Settings
      - Install Command: ```sh npm i -d --force```
    - Environment Variables
      - DATABASE_URL: Your database URL - for example: ```postgresql://user:password@localhost:5432/database```
      - NEXTAUTH_URL: Your website URL
      - NEXTAUTH_SECRET: Your secret key - Absolutely random string
  8. Click on "Deploy" and wait for the deployment to finish
  9. After the deployment is finished, click on "Visit" and you should see the website

## Contributing
We welcome contributions to Vytvorkonverzku. If you would like to contribute, please fork the repository and submit a pull request. We are always looking for new features and improvements to the system. If you have any questions or need help, please feel free to contact us.
Here are some ways you can contribute:

- [Open an issue](https://github.com/domitg/vytvorkonverzku/issues) if you believe
  you've encountered a bug.
- [Make a pull request](https://github.com/domitg/vytvorkonverzku/pulls) to add new
  features or fix bugs. Before making a pull request, please discuss the change
  you wish to make via issue.

<br />
<a href="https://github.com/domitg/vytvorkonverzku/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=domitg/vytvorkonverzku" />
</a>

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
