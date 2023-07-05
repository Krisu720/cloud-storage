"use client";

import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <UploadButton endpoint="imageUploader" />
      <Link href="/photos">photos</Link>
    </main>
  );
}
