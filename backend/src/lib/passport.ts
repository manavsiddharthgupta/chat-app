import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const googlePassportConfig = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: `${process.env.GOOGLE_CLIENT_ID}`,
				clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
				callbackURL: "http://localhost:4000/auth/google/callback",
			},
			function (_: any, __: any, profile: any, cb: any) {
				if (profile.emails[0].value) {
				}

				const getUser = async () => {
					try {
						const user = await prisma.user.findUnique({
							where: { email: profile.emails[0].value },
						});
						if (user) {
							return cb(null, profile);
						} else {
							const newUser = await prisma.user.create({
								data: {
									email: profile.emails[0].value,
									name: profile.displayName,
									password: `${profile.id}`,
									username: profile.emails[0].value.split("@")[0],
								},
							});
							console.log(newUser);
						}
					} catch (error) {
						console.log(error);
					}
				};
				getUser();
				return cb(null, profile);
			}
		)
	);
};

export default googlePassportConfig;
