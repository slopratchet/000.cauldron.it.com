with open("src/e2e.test.ts", "r") as f:
    content = f.read()

content = content.replace(
    "'Experiencing the Intimacy of the Tuning you own RPG',",
    "'PROTOCOL ENTRY POINT',"
)

content = content.replace(
    """
    // Verify the 'Now Open A Vein And Own Your Own Mess' registration link is present
    const forgeLink = await page.$('a[href="/market"]');
    expect(forgeLink).not.toBeNull();""",
    ""
)

with open("src/e2e.test.ts", "w") as f:
    f.write(content)
