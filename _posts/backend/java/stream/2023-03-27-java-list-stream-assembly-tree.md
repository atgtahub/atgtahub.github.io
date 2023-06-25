---
layout: post
title:  Java将集合组成树结构
categories: java
tag: stream
---


* content
{:toc}


## class

```java
public final class Area {
    /**
     * id
     */
    private Integer id;
    /**
     * 父id
     */
    private Integer parentId;
    /**
     * 子集合
     */
    private List<Area> children;

    public Area() {
    }

    public Area(Integer id, Integer parentId, List<Area> children) {
        this.id = id;
        this.parentId = parentId;
        this.children = children;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public List<Area> getChildren() {
        return children;
    }

    public void setChildren(List<Area> children) {
        this.children = children;
    }

    /**
     * 假数据
     * @return 数据列表
     */
    public static List<Area> fromDBList() {
        List<Area> all = new ArrayList<>();
        all.add(new Area(1, 0, null));
        all.add(new Area(2, 0, null));
        all.add(new Area(3, 0, null));
        all.add(new Area(4, 3, null));
        all.add(new Area(5, 2, null));
        all.add(new Area(6, 1, null));
        all.add(new Area(7, 4, null));
        all.add(new Area(8, 7, null));
        all.add(new Area(9, 2, null));
        return all;
    }
}
```

## stream 01

```java
public class TestProgram {

    public static void main(String[] args) {
        List<Area> treeList = streamToTreeList(Area.fromDBList(), 0);
        System.out.println(treeList);
    }

    public static List<Area> streamToTreeList(List<Area> list, Integer parentId) {
        return list.stream()
                // 过滤出父节点
                .filter(item -> parentId.equals(item.getParentId()))
                // 把父节点children递归赋值成为子节点
                .peek(item -> item.setChildren(streamToTreeList(list, item.getId())))
                .collect(Collectors.toList());
    }
}
```

## stream 02

```java
public class TestProgram {

    public static void main(String[] args) {
        List<Area> treeList = getTreeList(Area.fromDBList(), 0);
        System.out.println(treeList);
    }

    /**
     * 获取树状结构
     * @return tree list
     */
    public static List<Area> getTreeList(List<Area> list, Integer rootId) {
        // 过滤出父节点
        List<Area> parentList = list.stream()
                .filter(item -> rootId.equals(item.getParentId()))
                .collect(Collectors.toList());
        // 遍历父节点
        for (Area parent : parentList) {
            recursion(area, list);
        }

        return parentList;
    }

    /**
     * 递归组成树
     * 思路：
     * 1、过滤出当前遍历父节点的子集
     * 2、判断当前子集是否为空，如果为空则说明当前父节点没有子集
     * 3、如果不为空，遍历当前子集，再次进入方法进行递归处理
     *
     * @param parent 父节点
     * @param list 所有数据集合
     */
    public static void recursion(Area parent, List<Area> list) {
        // 过滤出当前节点的子集
        List<Area> childrenList = list.stream()
                .filter(child -> parent.getId().equals(child.getParentId()))
                .collect(Collectors.toList());
        // 判断子集是否为空
        if (!childrenList.isEmpty()) {
            // 设置子集数据
            parent.setChildren(childrenList);
            // 循环进行递归
            for (Area child : childrenList) {
                recursion(child, list);
            }
        }
    }
}
```

## stream.collect(Collectors.groupingBy())

```java
public class TestProgram {

    public static void main(String[] args) {
        List<Area> treeList = getTreeList(Area.fromDBList(), 0);
        System.out.println(treeList);
    }

    public static List<Area> getTreeList(List<Area> list, Integer rootId) {
        // 按照父id分组为map，key：父id，value：父id对应的子集列表
        Map<Integer, List<Area>> groupingMap = list.stream().collect(Collectors.groupingBy(Area::getParentId));
        // 遍历根节点集合
        List<Area> treeList = groupingMap.get(rootId);
        for (Area parent : treeList) {
            recursiveWithGroupingBy(groupingMap, parent);
        }

        return treeList;
    }

    /**
     * @see org.springframework.util.MultiValueMap
     * @param groupingMap map
     * @param parent      当前父节点
     */
    public static void recursiveWithGroupingBy(Map<Integer, List<Area>> groupingMap, Area parent) {
        // 根据父id从map中获取到子集
        List<Area> children = groupingMap.get(parent.getId());
        parent.setChildren(children);

        // 如果为空则返回
        if (children == null || children.isEmpty()) {
            return;
        }

        // 递归处理
        for (Area child : children) {
            recursiveWithGroupingBy(groupingMap, child);
        }
    }
}
```

## double for

```java
public class TestProgram {

    public static void main(String[] args) {
        List<Area> treeList = getTreeList(Area.fromDBList(), 0);
        System.out.println(treeList);
    }

    /**
     * 获取树状结构
     *
     * @param list   数据集合
     * @param rootId 根节点id
     * @return tree list
     */
    public static List<Area> getTreeList(List<Area> list, Integer rootId) {
        List<Area> treeList = new ArrayList<>();
        for (Area item : list) {
            // 如果为根节点则加入到集合中，并进行下一次循环
            if (rootId.equals(item.getParentId())) {
                treeList.add(item);
                continue;
            }

            // 内层循环每次都从第一个元素开始遍历
            // 走到这一步说明不是根节点，判断当前外层节点父id是否等于内层循环正在遍历的节点id
            // 如果是则确定外层节点（当前）为内层节点（当前）的子集，先判断集合是否初始化，再进行添加操作进入下一次外层循环
            for (Area parent : list) {
                if (item.getChildren() == null && item.getParentId().equals(parent.getId())) {
                    if (parent.getChildren() == null) {
                        parent.setChildren(new ArrayList<>());
                    }
                    parent.getChildren().add(item);
                    break;
                }
            }
        }

        return treeList;
    }
}
```
