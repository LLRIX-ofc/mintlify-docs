import os
import subprocess
from pathlib import Path
from tqdm import tqdm

# Supported input formats
INPUT_EXTENSIONS = ['.mp3', '.mp4']

def convert_to_m4a(input_path: Path, output_path: Path):
    try:
        subprocess.run([
            'ffmpeg',
            '-y',                    # Overwrite output files
            '-i', str(input_path),  # Input file
            '-vn',                  # Remove video stream (audio only)
            '-acodec', 'aac',       # Audio codec
            '-b:a', '192k',         # Audio bitrate
            '-map_metadata', '0',   # Copy all metadata
            '-movflags', 'use_metadata_tags',  # Use metadata tags in output
            str(output_path)
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print(f"[ERROR] Failed to convert {input_path}: {e}")

def main():
    root_folder = Path.cwd()
    files_to_convert = []

    for ext in INPUT_EXTENSIONS:
        files_to_convert.extend(root_folder.rglob(f'*{ext}'))

    if not files_to_convert:
        print("No .mp3 or .mp4 files found.")
        return

    print(f"Found {len(files_to_convert)} files to convert...\n")

    for file_path in tqdm(files_to_convert, desc="Converting"):
        output_path = file_path.with_suffix('.m4a')
        convert_to_m4a(file_path, output_path)

    print("\n✅ Conversion complete. Metadata preserved.")

if __name__ == "__main__":
    main()
