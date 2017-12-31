import { markdown, warn } from "danger"

warn("Hello, from Peril!")
markdown("Testing this too, hi!")
fail("Sorry!")

// TODO: Add a check to see if a changelog exists, then warn if it isn't in modified etc
