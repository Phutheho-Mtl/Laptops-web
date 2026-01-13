# Laptops Web

Laptops Web is a React + Vite application developed for managing and showcasing refurbished laptops for sale. The repository contains two applications: a Buyer-facing site and an Admin portal.

## Project Overview

The Buyer-facing application enables customers to browse available laptops, view multiple images, read specifications, and contact the seller directly to enquire about purchasing. The site also includes information about additional business services such as laptop repairs, replacements, and upgrades. Laptop listings are retrieved from a Supabase database and displayed dynamically.

The Admin portal is reserved for authorized users (limited to the developer and business owner). It provides access to Supabase-backed inventory management features. After signing in using Google via Supabase Auth, authorized users can add new laptop entries—with image uploads to Supabase Storage—and remove items from the inventory. All database and file operations occur directly from the client based on Supabase services; no backend server is used.

## Technology Stack

| Layer            | Technology Used               |
|------------------|-------------------------------|
| Framework        | React + Vite                  |
| Authentication   | Supabase Auth (Google OAuth)  |
| Database         | Supabase PostgreSQL           |
| File Storage     | Supabase Storage              |
| API / Backend    | None (frontend-only architecture) |

## Development Objective

The goal of this project was to create a functional system to support a real-world laptop business while gaining end-to-end practical experience with client-side data workflows, modern frontend tools, and hosted backend services. This project intentionally avoids a custom backend, instead relying entirely on Supabase capabilities.

The developer focused on the following objectives:
- Understanding React: components, props, state, and `useEffect`
- Integrating authentication and authorization using Supabase Auth
- Performing CRUD operations securely from the client
- Uploading, storing, and retrieving media files through Supabase Storage
- Designing distinct public and administrative user interfaces
- Building entirely from official documentation without boilerplates or frameworks

## Documentation Consulted

All implementation work followed official references:

React Documentation  
https://react.dev/

Vite Documentation  
https://vitejs.dev/guide/

Supabase JavaScript Reference  
https://supabase.com/docs/reference/javascript

Supabase Authentication Guides  
https://supabase.com/docs/guides/auth

This project represents the developer’s first production deployment using React and Supabase. No external templates or tutorials were used—every feature was built by studying and applying the above documentation.


