import { atom, selector } from "recoil";
import { getOptions } from "../pages/system.module/optionsView/optionsView.api";

export const hasChildDeptOptionsAtom = atom({
    key: "hasChildDeptOptionsAtom",
    default: selector({
      key: "hasChildDeptOptionsDefaultSelector",
      get: async () => {
        const options = await getOptions('HasChildDept');
        return options;
      },
    }),
});

export const sponsorOptionsAtom = atom({
  key: "sponsorOptionsAtom",
  default: selector({
    key: "sponsorOptionsDefaultSelector",
    get: async () => {
      const options = await getOptions('Sponsor');
      return options;
    },
  }),
});

export const flowDefineOptionsAtom = atom({
  key: "flowDefineOptionsAtom",
  default: selector({
    key: "flowDefineOptionsDefaultSelector",
    get: async () => {
      const options = await getOptions('FlowDefine');
      return options;
    },
  }),
});

export const programStructureOptionsAtom = atom({
  key: "programStructureOptionsAtom",
  default: selector({
    key: "programStructureOptionsDefaultSelector",
    get: async () => {
      const options = await getOptions('ProgramStructure');
      return options;
    },
  }),
});

export const programMenuOptionsAtom = atom({
  key: "programMenuOptionsAtom",
  default: selector({
    key: "programMenuOptionsDefaultSelector",
    get: async () => {
      const options = await getOptions('ProgramMenu');
      return options;
    },
  }),
});

export const programOptionsAtom = atom({
  key: "programOptionsAtom",
  default: selector({
    key: "programOptionsDefaultSelector",
    get: async () => {
      const options = await getOptions('ProgramStructure');
      return options;
    },
  }),
});

export const roleOptionsAtom = atom({
  key: "roleOptionsAtom",
  default: selector({
    key: "roleOptionsDefaultSelector",
    get: async () => {
      const options = await getOptions('Groups');
      return options;
    },
  }),
});

export const employeeOptionsAtom = atom({
  key: "employeeOptionsAtom",
  default: selector({
    key: "employeeOptionsDefaultSelector",
    get: async () => {
      const employeeOptions = await getOptions('Employee');
      const groups = [...new Set(employeeOptions.map(employee => employee.groups))];
      return { employeeOptions, groups };
    },
  }),
});

export const employeeNameSelector = (empId)=>{
  if(!empId) return ''
  return selector({
    key: `employeeNameSelector-${empId}`,
    get: ({ get }) => {
      const employeeOptions = get(employeeOptionsSelector);
      return employeeOptions[empId] || empId;
    },
  });
}

export const employeeOptionsSelector = selector({
  key: 'employeeOptionsSelector',
  get: ({ get }) => {
    const { employeeOptions } = get(employeeOptionsAtom);
    return employeeOptions;
  }
});

export const deptEmployeesSelector = selector({
  key: 'departmentEmployeesSelector',
  get: ({ get }) => {
    const { employeeOptions, groups } = get(employeeOptionsAtom);
    const deptEmployees = groups.reduce((dept, group) => {
      dept[group] = employeeOptions.filter(employee => employee.groups === group);
      return dept;
    }, {});
    return deptEmployees;
  }
});

export const departmentOptionsAtom = atom({
    key: "departmentOptionsAtom",
    default: selector({
      key: "departmentOptionsDefaultSelector",
      get: async () => {
        const departmentOptions = await getOptions('Department');
        const parents = [...new Set(departmentOptions.map(dept => dept.groups))];
        return { departmentOptions, parents };
      },
    }),
});

export const departmentOptionsSelector = selector({
  key: 'departmentOptionsSelector',
  get: ({ get }) => {
    const { departmentOptions } = get(departmentOptionsAtom);
    return departmentOptions;
  }
});

export const parentDepartmentsSelector = selector({
  key: 'parentDepartmentsSelector',
  get: ({ get }) => {
    const { departmentOptions, parents } = get(departmentOptionsAtom);
    const parentDepartments = parents.reduce((parent, group) => {
      parent[group] = departmentOptions.filter(dept => dept.groups === group);
      return parent;
    }, {});
    return parentDepartments;
  }
});

export const accountingOptionsAtom = atom({
  key: "accountingOptionsAtom",
  default: selector({
    key: "accountingOptionsDefaultSelector",
    get: async () => {
      const accountingOptions = await getOptions('Accounts');
      const parents = [...new Set(accountingOptions.map(account => account.groups))];
      return { accountingOptions, parents };
    },
  }),
});

export const accountingOptionsSelector = selector({
key: 'accountingOptionsSelector',
get: ({ get }) => {
  const { accountingOptions } = get(accountingOptionsAtom);
  return accountingOptions;
}
});

export const parentAccountingsSelector = selector({
key: 'parentAccountingsSelector',
get: ({ get }) => {
  const { accountingOptions, parents } = get(accountingOptionsAtom);
  const parentAccountings = parents.reduce((parent, group) => {
    parent[group] = accountingOptions.filter(account => account.groups === group);
    return parent;
  }, {});
  return parentAccountings;
}
});

export const userCategoryOptionsAtom = atom({
  key: "userCategoryOptionsAtom",
  default: selector({
    key: "userCategoryOptionsDefaultSelector",
    get: async () => {
      const userCategoryOptions = await getOptions('UserCategory');
      const groups = [...new Set(userCategoryOptions.map(category => category.groups))];
      return { userCategoryOptions, groups };
    },
  }),
});

export const userCategoryOptionsSelector = selector({
  key: 'userCategoryOptionsSelector',
  get: ({ get }) => {
    const { userCategoryOptions } = get(userCategoryOptionsAtom);
    return userCategoryOptions;
  }
  });

export const groupUserCategoriesSelector = selector({
key: 'groupUserCategoriesSelector',
get: ({ get }) => {
  const { userCategoryOptions, groups } = get(userCategoryOptionsAtom);
  const groupUserCategories = groups.reduce((groupCode, group) => {
    groupCode[group] = userCategoryOptions.filter(category => category.groups === group);
    return groupCode;
  }, {});
  return groupUserCategories;
}
});

export const categoryOptionsAtom = atom({
  key: "categoryOptionsAtom",
  default: selector({
    key: "categoryOptionsDefaultSelector",
    get: async () => {
      const categoryOptions = await getOptions('Category');
      const groups = [...new Set(categoryOptions.map(category => category.groups))];
      return { categoryOptions, groups };
    },
  }),
});

export const categoryOptionsSelector = selector({
  key: 'categoryOptionsSelector',
  get: ({ get }) => {
    const { categoryOptions } = get(categoryOptionsAtom);
    return categoryOptions;
  }
  });

export const groupCategoriesSelector = selector({
key: 'groupCategoriesSelector',
get: ({ get }) => {
  const { categoryOptions, groups } = get(categoryOptionsAtom);
  const groupCategories = groups.reduce((groupCode, group) => {
    groupCode[group] = categoryOptions.filter(category => category.groups === group);
    return groupCode;
  }, {});
  return groupCategories;
}
});
