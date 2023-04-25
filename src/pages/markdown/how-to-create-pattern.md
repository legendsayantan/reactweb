## Simple way to create Character Patterns programmatically

Let's try to create the following pattern in C programming language, step by step -

```
   *
  * *
 * * *
* * * *
```

### Step 1: Notice the text units.

We can notice that certain number of whitespaces begin every line. so our first text unit are the whitespaces.

Also, we have (* ) (an asterisk and a space) repeating multiple times in a line after the whitespaces. So those will be
our second text unit.

### Step 2: Count the text units.

if we start counting from line 1, we can find -

**Line 1** ----> **first text unit** (whitespaces) = 3 and **second text unit** (* ) = 1

**Line 2** ----> **first text unit** (whitespaces) = 2 and **second text unit** (* ) = 2

**Line 3** ----> **first text unit** (whitespaces) = 1 and **second text unit** (* ) = 3

**Line 4** ----> **first text unit** (whitespaces) = 0 and **second text unit** (* ) = 4

### Step 3: Look at the numbers.

We can see that the number of **first text unit** or whitespaces is decreasing by 1 as soon as the **line count** grows
by 1, and it reaches 0 at the line 4. **In mathematical form -**

```first text unit = 4 - line count```

Similarly, we can see the number of **second text unit** or asterisks-space is increasing by 1 as soon as the **line
count** grows by 1, and **it has the same value as our line count**. **In mathematical form -**

```second text unit = line count```

### Step 4: Write the code.

Our pattern has 4 lines in total. So let's go ahead and create a loop to print the pattern line by line. We will use a
for loop to print the pattern line by line. The loop will run from 1 to 4, and the loop variable will be our line count.

```
for (int line_count = 1; line_count <= 4; line_count++)
{
    
}
```

In a line, there's multiple characters and even multiple type of characters. In this case, we have **whitespaces** and
also **asterisk-space** as we saw previously.

because the whitespaces come first in a line, we would write the loop to print whitespaces first. We have to
print ```4 - line count``` number of whitespaces in a line, and we will do exactly that.

``` 
for (int line_count = 1; line_count <= 4; line_count++)
{
    // print whitespaces
    for (int whitespaces = 1; whitespaces <= 4 - line_count; whitespaces++)
    {
        printf(" ");
    }
}
```

Now, we have to print the asterisk-space. We have to print ```line count``` number of asterisk-space in a line, and we
will do exactly that.

```
for (int line_count = 1; line_count <= 4; line_count++)
{
    // print whitespaces
    for (int whitespaces = 1; whitespaces <= 4 - line_count; whitespaces++)
    {
        printf(" ");
    }
    
    // print asterisk-space
    for (int asterisks = 1; asterisks <= line_count; asterisks++)
    {
        printf("* ");
    }
}
```

Now, as soon as we are done printing characters in a particular line we have to skip to the next line. We can do that by
using ```printf("\n");```

```
for (int line_count = 1; line_count <= 4; line_count++)
{
    // print whitespaces
    for (int whitespaces = 1; whitespaces <= 4 - line_count; whitespaces++)
    {
        printf(" ");
    }
    
    // print asterisk-space
    for (int asterisks = 1; asterisks <= line_count; asterisks++)
    {
        printf("* ");
    }
    
    // print new line
    printf("\n");
}
```

Finally, we have the complete code to print the pattern, and we are ready to run it.

### FAQ:

#### How to know which loop goes outside and which loop goes inside?

When we write in real life, we write characters in a line until we skip to the next line, and then we start writing
again.
So lines are the controlling factor to writing characters.
Everytime we write, **we put the characters inside a line**.
In programming, the **outer loop is the deciding factor for the execution of inner loop**.
This is why switching of line is always facilitated by the outer loop and all the character writing is done in the 
**inside of it**, via inner loops.  