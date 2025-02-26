function generateCode(codeBolcks) {
  let code = "";

  // 遍历每个代码块
  codeBolcks.forEach((codeBolck) => {
    switch (codeBolck.type) {
      case "assign":
        // 处理赋值操作
        const varName = codeBolck.fields.var;
        const value = codeBolck.fields.value;
        code += `${varName} = ${value};\n`;
        break;

      case "if":
        // 处理 if 语句
        const condition = generateCondition(codeBolck.inputs.condition);
        const thenBlocks = codeBolck.inputs.then;
        code += `if (${condition}) {\n`;

        // 遍历 if 语句中的块
        thenBlocks.forEach((subBlock) => {
          code += `  ${generateCode([subBlock])}\n`;
        });

        code += `}\n`;
        break;

      case "equals":
        // 处理 equals 操作符
        const left = codeBolck.fields.left;
        const right = codeBolck.fields.right;
        return `${left} === ${right}`;
    }
  });

  return code;
}

function generateCondition(conditionBlock) {
  switch (conditionBlock.type) {
    case "equals":
      const left = conditionBlock.fields.left;
      const right = conditionBlock.fields.right;
      return `${left} === ${right}`;
    // 你可以在这里添加更多的条件，如小于、大于等
  }
}
