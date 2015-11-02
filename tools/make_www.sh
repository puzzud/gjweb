onlyRemove=0

for arg in "$@"
do
  if [ "$arg" == "rm" ]; then
    onlyRemove=1
  fi
done

# First, remove www directory.
if [ -e "www" ]; then
  echo "Removing www directory."
  rm www -rf;

  if [ "$?" -ne "0" ]; then
    echo "Failed to remove www directory."
    exit $?
  fi

  if [ "$onlyRemove" -eq "1" ]; then
    exit 0
  fi
fi

# Make www directory and copy over files.
echo "Creating www directory."
mkdir www;

echo "Populating www directory."
cp assets -r www;
cp src -r www;
cp index.html www;
cp style.css www;
cp package.json www;

exit 0
