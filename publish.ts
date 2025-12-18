#!/usr/bin/env bun

/**
 * Publish Script
 * 
 * Automates the release process for the UI library and MCP server:
 * 1. Increments version in both package.json files
 * 2. Builds the main library
 * 3. Builds the MCP server
 * 4. Publishes the MCP server to npm
 * 
 * Usage:
 *   bun run publish.ts [patch|minor|major]
 * 
 * Default increment type is "patch" if not specified.
 */

import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

/** Valid semver increment types */
type VersionBump = "patch" | "minor" | "major";

/** Paths to package.json files */
const ROOT_PACKAGE = join(import.meta.dir, "package.json");
const MCP_PACKAGE = join(import.meta.dir, "mcp-server", "package.json");

/**
 * Increments a semver version string based on the bump type.
 * @param version - Current version string (e.g., "1.0.6")
 * @param bump - Type of version increment
 * @returns New version string
 */
function incrementVersion(version: string, bump: VersionBump): string {
	const [major, minor, patch] = version.split(".").map(Number);

	switch (bump) {
		case "major":
			return `${major + 1}.0.0`;
		case "minor":
			return `${major}.${minor + 1}.0`;
		case "patch":
		default:
			return `${major}.${minor}.${patch + 1}`;
	}
}

/**
 * Reads a package.json file and returns its parsed contents.
 */
function readPackageJson(path: string): { version: string; [key: string]: unknown } {
	const content = readFileSync(path, "utf-8");
	return JSON.parse(content);
}

/**
 * Writes updated content back to a package.json file.
 */
function writePackageJson(path: string, content: object): void {
	writeFileSync(path, JSON.stringify(content, null, "\t") + "\n");
}

/**
 * Executes a shell command and streams output to console.
 */
function run(command: string, cwd?: string): void {
	console.log(`\n📌 Running: ${command}`);
	execSync(command, { 
		stdio: "inherit", 
		cwd: cwd ?? import.meta.dir 
	});
}

/**
 * Main publish workflow
 */
async function main(): Promise<void> {
	// Parse command line argument for version bump type
	const bumpType = (process.argv[2] as VersionBump) || "patch";
	
	if (!["patch", "minor", "major"].includes(bumpType)) {
		console.error("❌ Invalid version bump type. Use: patch, minor, or major");
		process.exit(1);
	}

	console.log("🚀 Starting publish process...\n");

	// ============================================
	// STEP 1: Increment versions
	// ============================================
	console.log("📦 Step 1: Incrementing versions...");
	
	const rootPkg = readPackageJson(ROOT_PACKAGE);
	const mcpPkg = readPackageJson(MCP_PACKAGE);
	
	const oldVersion = rootPkg.version;
	const newVersion = incrementVersion(oldVersion, bumpType);
	
	rootPkg.version = newVersion;
	mcpPkg.version = newVersion;
	
	writePackageJson(ROOT_PACKAGE, rootPkg);
	writePackageJson(MCP_PACKAGE, mcpPkg);
	
	console.log(`   ✅ Version bumped: ${oldVersion} → ${newVersion}`);

	// ============================================
	// STEP 2: Build main library
	// ============================================
	console.log("\n🔨 Step 2: Building main library...");
	run("bun run build");
	console.log("   ✅ Main library built successfully");

	// ============================================
	// STEP 3: Build MCP server
	// ============================================
	console.log("\n🔨 Step 3: Building MCP server...");
	run("bun run build", join(import.meta.dir, "mcp-server"));
	console.log("   ✅ MCP server built successfully");

	// ============================================
	// STEP 4: Publish MCP server to npm
	// ============================================
	console.log("\n📤 Step 4: Publishing MCP server to npm...");
	run("npm publish --access public", join(import.meta.dir, "mcp-server"));
	console.log("   ✅ MCP server published successfully");

	// ============================================
	// Summary
	// ============================================
	console.log("\n" + "=".repeat(50));
	console.log("✨ Publish complete!");
	console.log(`   📦 Version: ${newVersion}`);
	console.log(`   📚 Package: ${mcpPkg.name}`);
	console.log("=".repeat(50) + "\n");
}

// Run the script
main().catch((error) => {
	console.error("\n❌ Publish failed:", error.message);
	process.exit(1);
});

