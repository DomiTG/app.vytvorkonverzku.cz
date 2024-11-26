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

# How to Install Vytvorkonverzku

Installing **Vytvorkonverzku** is straightforward and designed for easy deployment with **Vercel**. However, it can also be hosted with other providers or on your own server. Follow the steps below to get started.

---

## Installation Guide

### Deploying with Vercel

1. **Fork the Repository**
   - Start by forking this repository to your own GitHub account.

2. **Access the Vercel Dashboard**
   - Go to [Vercel's dashboard](https://vercel.com/dashboard).

3. **Add a New Project**
   - Click on the **"Add New"** button and select **"Project"**.

4. **Import the Git Repository**
   - In the **"Import Git Repository"** section, locate and select the repository you just forked.

5. **Configure Project Settings**
   - For the **Framework Preset**, select **Next.js**.
   - Set the **Root Directory** to `./`.

6. **Update Commands and Environment Variables**
   - Configure the following settings in the **Build and Output Settings**:
     - **Install Command**:
       ```bash
       npm i -d --force
       ```

   - Add the required **Environment Variables**:
     - `DATABASE_URL`: Your database URL, e.g.,
       `postgresql://user:password@localhost:5432/database`
     - `NEXTAUTH_URL`: Your website URL.
     - `NEXTAUTH_SECRET`: A random, secure string (used for authentication).

7. **Deploy the Project**
   - Click on the **"Deploy"** button to initiate the deployment process.

8. **Verify Deployment**
   - Once the deployment is complete, click on **"Visit"** to access your live website.

---

### Additional Notes
- Ensure that your environment variables are set correctly to avoid deployment issues.
- Use a strong and unique value for `NEXTAUTH_SECRET` to secure your application.

For further assistance or troubleshooting, consult the [Vercel Documentation](https://vercel.com/docs) or the project's Wiki.

---

Enjoy using **Vytvorkonverzku**!

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
