'use strict';
import * as vscode from 'vscode';
import * as cp from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.runArbitrary', () => {
    var output = vscode.window.createOutputChannel('foo');
    output.show(vscode.ViewColumn.Two);
    var editor = vscode.window.activeTextEditor;
    var fileName = editor.document.fileName;
    var position = editor.selection.active;
    var line_number = position.line.toString();
    var scriptPath = "C:/Dropbox/z_QDev_Morten_Hels_programs/meta/run_arbitrary.py";
    var args = [scriptPath, fileName, "--line_number", line_number];
    var opts = {env: process.env};
    let child = cp.spawn("python", args, opts);
    child.stdout.on('data', (data) => {
      output.append(data.toString());
    });
    child.stderr.on('data', (data) => {
      output.append(data.toString());
    });
    child.on('close', (code, signal) => {
      if (signal)
        output.appendLine('Exited with signal ' + signal)
      else if (code)
        output.appendLine('Exited with status ' + code)
    });
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
}
