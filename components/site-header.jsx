"use client";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeBtn } from "./ThemeBtn";
import { AnimatePresence, motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useDataProvider } from "@/store/DataProvider";
import { Monitor, Moon, Power, PowerOff, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

export function SiteHeader() {
  const { user } = useDataProvider();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { setTheme, theme } = useTheme();
  console.log("Current theme:", theme);

  const currenttheme = {
    light: <Sun size={"20"} />,
    dark: <Moon size={"20"} />,
    system: <Monitor size={"20"} />,
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const hoverMenuVariants = {
    hidden: {
      opacity: 0,
      x: 10,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const hoverItemVariants = {
    hidden: {
      opacity: 0,
      x: 10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 18,
      },
    },
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Documents</h1>
        <div className="ml-auto flex items-center relative text-sm ">
          {/* Avatar */}
          <button
            className=" cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="rounded-lg">
                {user?.username.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="absolute top-12 right-0 flex flex-col items-center gap-2"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.div
                  variants={itemVariants}
                  className="relative"
                  onHoverStart={() => setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                >
                  {/* Sun icon */}
                  <motion.div
                    className="bg-muted p-1.5 rounded-full cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    {currenttheme[theme]}
                  </motion.div>

                  {/* Hover menu */}
                  <AnimatePresence>
                    {hovered && (
                      <motion.div
                        className="absolute right-full mr-2 top-1/2 -translate-y-1/2
                        rounded-lg px-2 py-1 flex gap-2"
                        variants={hoverMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <motion.div
                          variants={hoverItemVariants}
                          onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                          }
                          className="flex items-center p-1.5 bg-muted gap-2 rounded-full hover:bg-accent cursor-pointer"
                        >
                          {currenttheme[theme === "light" ? "dark" : "light"]}
                        </motion.div>

                        <motion.div
                          variants={hoverItemVariants}
                          onClick={() =>
                            setTheme(theme === "system" ? "light" : "system")
                          }
                          className="flex items-center p-1.5 bg-muted gap-2 rounded-full hover:bg-accent cursor-pointer"
                        >
                          {currenttheme[theme === "system" ? "dark" : "system"]}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  onClick={() => signOut()}
                  className="bg-muted p-1.5 hover:text-red-500 transition-colors duration-300 ease-in-out rounded-full cursor-pointer"
                >
                  <Power />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
