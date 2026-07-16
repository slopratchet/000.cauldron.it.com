1. Modify `src/components/lobby-index/LobbyIndex.tsx` using `replace_with_git_merge_diff`:

```
<<<<<<< SEARCH
  const [showDbEditor, setShowDbEditor] = useState(false);
  const [showSystemLogsUrl, setShowSystemLogsUrl] = useState(false);

  // Raw text value for the editable JSON database representation
=======
  const [showDbEditor, setShowDbEditor] = useState(false);
  const [showSystemLogsUrl, setShowSystemLogsUrl] = useState(false);
  const [showClerkDataUrl, setShowClerkDataUrl] = useState(false);

  // Raw text value for the editable JSON database representation
>>>>>>> REPLACE
```

```
<<<<<<< SEARCH
    setShowDbEditor(hasParam);
    setShowSystemLogsUrl(params.get('logs') === 'true');
  }, []);
=======
    setShowDbEditor(hasParam);
    setShowSystemLogsUrl(params.get('logs') === 'true');
    setShowClerkDataUrl(params.get('clerkdata') === 'true');
  }, []);
>>>>>>> REPLACE
```

```
<<<<<<< SEARCH
        {/* 4. DYNAMIC SHREDDED GRID SYSTEM */}
        {(isInputVisible || isLogsVisible) && (
          <section
            id="coordinate-diagnostics-deck"
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch mb-0"
          >
            {/* INPUT FORMS OVERRIDE */}
            {isInputVisible && (
              <div
                className={`${isLogsVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <CommandPanel
                  onExecuteQuery={handleExecuteQuery}
                  onInsertSession={handleInsertSession}
                  onAddLog={handleAddLog}
                />
              </div>
            )}

            {/* SYSTEM EVENT LOGS */}
            {isLogsVisible && (
              <div
                className={`${isInputVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <ClerkDataSchema />
              </div>
            )}
          </section>
        )}
=======
        {/* 4. DYNAMIC SHREDDED GRID SYSTEM */}
        {(isInputVisible || showClerkDataUrl) && (
          <section
            id="coordinate-diagnostics-deck"
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch mb-0"
          >
            {/* INPUT FORMS OVERRIDE */}
            {isInputVisible && (
              <div
                className={`${showClerkDataUrl ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <CommandPanel
                  onExecuteQuery={handleExecuteQuery}
                  onInsertSession={handleInsertSession}
                  onAddLog={handleAddLog}
                />
              </div>
            )}

            {/* SYSTEM EVENT LOGS */}
            {showClerkDataUrl && (
              <div
                className={`${isInputVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <ClerkDataSchema />
              </div>
            )}
          </section>
        )}
>>>>>>> REPLACE
```

2. Modify `src/components/control-index/ControlIndex.tsx` using `replace_with_git_merge_diff`:

```
<<<<<<< SEARCH
  const [showDbEditor, setShowDbEditor] = useState(false);
  const [showSystemLogsUrl, setShowSystemLogsUrl] = useState(false);

  // Raw text value for the editable JSON database representation
=======
  const [showDbEditor, setShowDbEditor] = useState(false);
  const [showSystemLogsUrl, setShowSystemLogsUrl] = useState(false);
  const [showClerkDataUrl, setShowClerkDataUrl] = useState(false);

  // Raw text value for the editable JSON database representation
>>>>>>> REPLACE
```

```
<<<<<<< SEARCH
    setShowDbEditor(hasParam);
    setShowSystemLogsUrl(params.get('logs') === 'true');
  }, []);
=======
    setShowDbEditor(hasParam);
    setShowSystemLogsUrl(params.get('logs') === 'true');
    setShowClerkDataUrl(params.get('clerkdata') === 'true');
  }, []);
>>>>>>> REPLACE
```

```
<<<<<<< SEARCH
        {/* 4. DYNAMIC SHREDDED GRID SYSTEM */}
        {(isInputVisible || isLogsVisible) && (
          <section
            id="coordinate-diagnostics-deck"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8"
          >
            {/* INPUT FORMS OVERRIDE */}
            {isInputVisible && (
              <div
                className={`${isLogsVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <CommandPanel
                  onExecuteQuery={handleExecuteQuery}
                  onInsertSession={handleInsertSession}
                  onAddLog={handleAddLog}
                />
              </div>
            )}

            {/* SYSTEM EVENT LOGS */}
            {isLogsVisible && (
              <div
                className={`${isInputVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <ClerkDataSchema />
              </div>
            )}
          </section>
        )}
=======
        {/* 4. DYNAMIC SHREDDED GRID SYSTEM */}
        {(isInputVisible || showClerkDataUrl) && (
          <section
            id="coordinate-diagnostics-deck"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8"
          >
            {/* INPUT FORMS OVERRIDE */}
            {isInputVisible && (
              <div
                className={`${showClerkDataUrl ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <CommandPanel
                  onExecuteQuery={handleExecuteQuery}
                  onInsertSession={handleInsertSession}
                  onAddLog={handleAddLog}
                />
              </div>
            )}

            {/* SYSTEM EVENT LOGS */}
            {showClerkDataUrl && (
              <div
                className={`${isInputVisible ? 'lg:col-span-6' : 'lg:col-span-12'} flex flex-col justify-between`}
              >
                <ClerkDataSchema />
              </div>
            )}
          </section>
        )}
>>>>>>> REPLACE
```

3. Run `run_in_bash_session` with `git diff` to verify the changes applied correctly.
4. Run formatting and tests using `run_in_bash_session` with `npm run check:all && npm run test:unit && npm run test:e2e`.
5. Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
6. Submit the change using `submit`.
