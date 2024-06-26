import type User from "next-auth"

declare module "next-auth/jwt" {
	interface JWT {
		userID?: string
	}
}

declare module "next-auth" {
	interface Session {
		user:User &  {
			id?: string
		}
	}
}