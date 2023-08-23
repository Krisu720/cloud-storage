<img src="https://utfs.io/f/2098af68-4921-48e7-ad13-8b857489ab89_cloudstorage.png"/>
<img src="https://utfs.io/f/cc972aeb-6cf2-4589-8063-db762ca4b5c5_cloudstorage2.png"/>

## Demo

https://cloud-storage-chi.vercel.app/

<h5>If you dont want to make account you can use demo credentials:</h5>

email:

```bash
demo@demo.com
```
password:

```bash
demo12345
```

## Used Technologies

- [Tailwind](https://tailwindcss.com/)
- [Next.js 13](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix-ui](https://www.radix-ui.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [next-auth](https://next-auth.js.org/)
- [shadcn-ui](https://ui.shadcn.com/)
- [lucide-react](https://lucide.dev/guide/packages/lucide-react)
- [uuid](https://www.npmjs.com/package/uuid)
- [react-hook-form](https://react-hook-form.com/)
- [axios](https://axios-http.com/docs/intro)
- [SWR](https://swr.vercel.app/)
- [react-qr-code](https://www.npmjs.com/package/react-qr-code)
- [zod](https://zod.dev/)
- [zustand](https://zustand-demo.pmnd.rs/)


## Installation

### REQUIRED:
- Uploadthing account - https://uploadthing.com/

1.First clone repository or download from github.
```
git clone https://github.com/Krisu720/cloud-storage.git
```
2.Then install missing packages using node.
```
npm install
```
3.Create .env file which includes:

```
UPLOADTHING_SECRET=#uploadthing secret#
UPLOADTHING_APP_ID=#uploadthing app id#
BCRYPT_SALTS=#salts to hash passwords#
DATABASE_URL=#postgresdb link#
NEXTAUTH_SECRET=#random letters secret#
NEXTAUTH_URL=#default url for example http://localhost:3000/#
```
4.Migrate prisma database.
```
npx prisma migrate dev
```
5.After installation run development server.
```
npm run dev
```


