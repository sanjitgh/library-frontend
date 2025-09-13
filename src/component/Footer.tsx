export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-4 mt-10">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <p>
          © {new Date().getFullYear()} Library Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
